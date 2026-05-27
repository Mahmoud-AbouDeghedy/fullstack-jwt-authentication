import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

/**
 * Users Module
 *
 * This module handles the user entity management in the application.
 * It registers the User schema with MongoDB and provides the UsersService
 * for user-related operations like creating users and finding users by email.
 *
 * The module is imported by other modules that need user functionality,
 * particularly by the AuthModule for authentication operations.
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
