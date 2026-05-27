import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

/**
 * Users Service
 *
 * Provides functionality for user management operations such as:
 * - Creating new users with secure password hashing
 * - Finding users by their email address
 *
 * This service interacts with the MongoDB database through Mongoose models
 * and handles all user-related data operations securely.
 */
@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  /**
   * Creates an instance of the UsersService
   *
   * @param userModel - Injected Mongoose model for User entity
   */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Creates a new user with the provided information
   *
   * @param email - User's email address (must be unique)
   * @param name - User's name
   * @param password - User's plain-text password (will be hashed before storage)
   * @returns Promise resolving to the newly created user document
   * @throws Error if user creation fails (e.g., duplicate email)
   */
  async create(
    email: string,
    name: string,
    password: string,
  ): Promise<UserDocument> {
    try {
      this.logger.log(`Creating new user with email: ${email}`);
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser: UserDocument = new this.userModel({
        email,
        name,
        password: hashedPassword,
      });
      const savedUser: UserDocument = await newUser.save();
      this.logger.log(`User created successfully: ${email}`);
      return savedUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to create user: ${error.message}`,
          error.stack,
        );
        throw new Error(`Failed to create user: ${error.message}`);
      } else {
        this.logger.error('Failed to create user: Unknown error');
        throw new Error('Failed to create user: Unknown error');
      }
    }
  }

  /**
   * Finds a user by their email address
   *
   * @param email - Email address to search for
   * @returns Promise resolving to the found user document or null if not found
   * @throws Error if the database query fails
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      this.logger.log(`Finding user by email: ${email}`);
      return await this.userModel.findOne({ email }).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error finding user by email: ${error.message}`,
          error.stack,
        );
        throw new Error(`Failed to find user: ${error.message}`);
      } else {
        this.logger.error('Error finding user by email: Unknown error');
        throw new Error('Failed to find user: Unknown error');
      }
    }
  }
}
