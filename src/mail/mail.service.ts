import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as SparkPost from 'sparkpost';
import { SendEmailDto } from './dto/send-email.dto';
import * as sgMail from '@sendgrid/mail';
import { User } from '../auth/user.entity';
import { Mail } from './mail.entity';
import { MailRepository } from './mail.repository';

@Injectable()
export class MailService {
  constructor(private mailRepository: MailRepository) {}

  async sendEmail(sendEmailDto: SendEmailDto, user: User): Promise<string> {
    const provider = await this.useProviders(sendEmailDto);
    await this.createEmail(sendEmailDto, user, provider);
    return `Email has been sended to ${sendEmailDto.to}`;
  }

  async getEmails(user: User): Promise<Mail[]> {
    const query = this.mailRepository.createQueryBuilder('mail');
    query.where('mail.userId = :userId', { userId: user.id });
    const mails = await query.getMany();
    return mails;
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
      from: 'vargas88hugo@gmail.com',
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
        from: 'testing@sparkpostbox.com',
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
