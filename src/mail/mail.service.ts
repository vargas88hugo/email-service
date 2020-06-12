import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as SparkPost from 'sparkpost';
import { SendEmailDto } from './dto/send-email.dto';
import * as sgMail from '@sendgrid/mail';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';
import { Mail } from './mail.entity';

@Injectable()
export class MailService {
  constructor(private userRepository: UserRepository) {}

  async sendEmail(sendEmailDto: SendEmailDto, user: User): Promise<string> {
    const provider = await this.useProviders(sendEmailDto);
    await this.createEmail(sendEmailDto, user, provider);
    return `Email has been sended to ${sendEmailDto.to}`;
  }

  async createEmail(sendEmailDto: SendEmailDto, user: User, provider: string) {
    const email = new Mail();
    email.to = sendEmailDto.to;
    email.subject = sendEmailDto.subject;
    email.provider = provider;
    email.user = user;
    try {
      await email.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async sendGrid(sendEmailDto: SendEmailDto): Promise<void> {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
      to: sendEmailDto.to,
      from: sendEmailDto.from,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
      html: `<strong>${sendEmailDto.text}</strong>`,
    };
    await sgMail.send(msg);
  }

  async sparkPost(sendEmailDto: SendEmailDto): Promise<void> {
    const client = new SparkPost(process.env.SPARKPOST_KEY);
    await client.transmissions.send({
      options: {
        sandbox: true,
      },
      content: {
        from: sendEmailDto.from,
        subject: sendEmailDto.subject,
        html: `<strong>${sendEmailDto.text}</strong>`,
      },
      recipients: [{ address: sendEmailDto.to }],
    });
  }

  async useProviders(sendEmailDto: SendEmailDto): Promise<string> {
    try {
      await this.sendGrid(sendEmailDto);
      return 'SendGrid';
    } catch (err) {
      try {
        return 'SparkPost';
      } catch (error) {
        console.log('Spark', error);
        throw new BadRequestException("Email can't be sended");
      }
    }
  }
}
