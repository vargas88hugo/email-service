import { Mail } from '../mail.interface';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SendEmailDto implements Mail {
  @IsString()
  @MaxLength(30)
  @IsEmail()
  from: string;

  @IsString()
  @MaxLength(30)
  @IsEmail()
  to: string;

  @IsString()
  @MaxLength(20)
  subject: string;

  @IsString()
  @MinLength(6)
  text: string;
}
