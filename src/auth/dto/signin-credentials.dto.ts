import { IsEmail, MinLength, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInCredentialsDto {
  @IsEmail()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
