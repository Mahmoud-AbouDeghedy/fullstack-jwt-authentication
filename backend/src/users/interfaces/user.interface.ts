import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
}
