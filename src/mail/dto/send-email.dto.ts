import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @IsString()
  @MaxLength(30)
  @IsEmail()
  @ApiProperty({ type: String, description: 'to' })
  to: string;

  @IsString()
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'subject' })
  subject: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'text' })
  text: string;
}
