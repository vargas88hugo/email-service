import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('mail')
@UseGuards(AuthGuard())
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('/send')
  sendEmail(
    @Body(ValidationPipe) sendEmailDto: SendEmailDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.mailService.sendEmail(sendEmailDto, user);
  }
}
