import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsEmail()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password to weak',
  })
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
