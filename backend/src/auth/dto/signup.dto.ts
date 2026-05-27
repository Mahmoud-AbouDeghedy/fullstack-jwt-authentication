import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name (min 3 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @ApiProperty({
    example: 'Pass123!',
    description:
      'Password (min 8 chars, at least 1 letter, 1 number, 1 special char)',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/, {
    message:
      'Password must contain at least one letter, one number and one special character',
  })
  password: string;
}
