import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/user.entity';
import { Mail } from './mail.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('mail')
@UseGuards(AuthGuard())
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('/send')
  @ApiCreatedResponse({ description: 'Send an email to a destinatary' })
  @ApiBody({ type: SendEmailDto })
  async sendEmail(
    @Body(ValidationPipe) sendEmailDto: SendEmailDto,
    @GetUser() user: User,
  ): Promise<string> {
    return await this.mailService.sendEmail(sendEmailDto, user);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Get all the emails of the user authenticated',
  })
  async getEmails(@GetUser() user: User): Promise<Mail[]> {
    return await this.mailService.getEmails(user);
  }
}
