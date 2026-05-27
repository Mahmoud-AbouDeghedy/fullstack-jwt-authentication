import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * UserDocument Type
 *
 * A type that combines the User class with MongoDB Document
 * properties and methods, including the _id field of type ObjectId.
 */
export type UserDocument = User & Document;

/**
 * User Schema
 *
 * MongoDB schema for the User collection which includes:
 * - email: A unique email address for user identification
 * - name: The user's full name
 * - password: Hashed password for authentication
 *
 * This schema is used by the UsersService for CRUD operations.
 */
@Schema()
export class User {
  /**
   * User's email address
   * Must be unique across the database
   */
  @Prop({ required: true, unique: true })
  email: string;

  /**
   * User's full name
   */
  @Prop({ required: true })
  name: string;

  /**
   * User's hashed password
   * Raw passwords should never be stored
   */
  @Prop({ required: true })
  password: string;

  // Note: _id field is automatically added by MongoDB
  // and accessible through the Document interface
}

/**
 * Mongoose schema created from the User class
 * Used for registering with MongooseModule
 */
export const UserSchema = SchemaFactory.createForClass(User);
