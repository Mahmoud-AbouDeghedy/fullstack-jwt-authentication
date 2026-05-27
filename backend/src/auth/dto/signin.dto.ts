import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({
    example: 'Pass123!',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
