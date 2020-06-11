import { IsEmail, MinLength, IsString, MaxLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
