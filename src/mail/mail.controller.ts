import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('/send')
  sendEmail(@Body(ValidationPipe) sendEmailDto: SendEmailDto): Promise<any> {
    return this.mailService.sendEmail(sendEmailDto);
  }
}
