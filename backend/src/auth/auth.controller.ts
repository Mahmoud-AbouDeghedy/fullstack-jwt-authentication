import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards, Get, Logger } from '@nestjs/common';

import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

/**
 * Authentication Controller
 *
 * Handles HTTP requests related to authentication:
 * - User registration (signup)
 * - User login (signin)
 * - Protected profile endpoint for testing authentication
 *
 * All routes are prefixed with '/auth'
 */
@ApiTags('Auth Module')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  /**
   * Creates an instance of AuthController
   *
   * @param authService - Service for authentication operations
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user in the system
   *
   * @param signupDto - User registration data
   * @returns Registration result with token and user information
   */
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  signup(@Body() signupDto: SignupDto): Promise<{
    message: string;
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }> {
    this.logger.log('Signup request received');
    return this.authService.signup(signupDto);
  }

  /**
   * Authenticates a user with credentials
   *
   * @param signinDto - User login credentials
   * @returns Authentication result with token and user information
   */
  @Post('signin')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  signin(@Body() signinDto: SigninDto): Promise<{
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }> {
    this.logger.log('Signin request received');
    return this.authService.signin(signinDto);
  }

  /**
   * Protected endpoint that requires authentication
   * Used to test if authentication is working properly
   *
   * @returns Success message
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Protected endpoint accessed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  getProfile(): { message: string } {
    this.logger.log('Protected profile endpoint accessed');
    return { message: 'Protected endpoint accessed successfully' };
  }
}
