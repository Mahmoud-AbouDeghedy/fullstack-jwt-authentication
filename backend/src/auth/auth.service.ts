import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserDocument } from '../users/schemas/user.schema';

/**
 * Authentication Service
 *
 * Provides core authentication functionality including:
 * - User registration (signup)
 * - User authentication (signin)
 * - JWT token generation for authenticated sessions
 *
 * This service works with the UsersService to manage authentication
 * and uses JWT for secure, stateless authentication.
 */
@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  /**
   * Creates an instance of AuthService
   *
   * @param usersService - Service for user operations (creation, retrieval)
   * @param jwtService - Service for JWT token generation and verification
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user in the system
   *
   * @param signupDto - Data transfer object containing user registration information
   * @returns Promise with registration result containing JWT token and user information
   * @throws ConflictException if email already exists
   * @throws BadRequestException if user creation fails
   */
  async signup(signupDto: SignupDto): Promise<{
    message: string;
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }> {
    const { email, name, password } = signupDto;

    this.logger.log(`Processing signup request for email: ${email}`);

    // Check if user already exists
    const existingUser: UserDocument | null =
      await this.usersService.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`Signup attempt with existing email: ${email}`);
      throw new ConflictException('Email already exists');
    }

    // Create new user
    try {
      const user: UserDocument = await this.usersService.create(
        email,
        name,
        password,
      );
      const payload: { email: string; id: string } = {
        email: user.email,
        id: (user._id as Types.ObjectId).toString(),
      };
      this.logger.log(`User successfully registered: ${email}`);
      return {
        message: 'User registered successfully',
        access_token: this.jwtService.sign(payload),
        user: {
          id: (user._id as Types.ObjectId).toString(),
          email: user.email,
          name: user.name,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to create user: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error('Failed to create user due to an unknown error');
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  /**
   * Authenticates a user with email and password
   *
   * @param signinDto - Data transfer object containing login credentials
   * @returns Promise with authentication result containing JWT token and user information
   * @throws UnauthorizedException for invalid credentials
   * @throws BadRequestException if signin process fails
   */
  async signin(signinDto: SigninDto): Promise<{
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }> {
    try {
      const { email, password } = signinDto;
      this.logger.log(`Processing signin request for email: ${email}`);

      // Find user by email
      const user: UserDocument | null =
        await this.usersService.findByEmail(email);
      if (!user) {
        this.logger.warn(`Signin attempt with non-existent email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Validate password
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        this.logger.warn(`Failed login attempt for user: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      this.logger.log(`User successfully authenticated: ${email}`);
      // Generate JWT token
      const payload: { email: string; id: string } = {
        email: user.email,
        id: (user._id as Types.ObjectId).toString(),
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: (user._id as Types.ObjectId).toString(),
          email: user.email,
          name: user.name,
        },
      };
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof Error) {
        this.logger.error(`Signin error: ${error.message}`, error.stack);
      } else {
        this.logger.error('Signin error: Unknown error occurred');
      }
      throw new BadRequestException('Failed to sign in');
    }
  }
}
