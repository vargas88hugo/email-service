import { Injectable, BadRequestException } from '@nestjs/common';
import * as SparkPost from 'sparkpost';
import { SendEmailDto } from './dto/send-email.dto';
import * as sgMail from '@sendgrid/mail';
import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class MailService {
  constructor(private userRepository: UserRepository) {}

  async sendEmail(sendEmailDto: SendEmailDto, user: User): Promise<any> {
    try {
      return await this.sendGrid(sendEmailDto);
    } catch (err) {
      try {
        return await this.sparkPost(sendEmailDto);
      } catch (error) {
        throw new BadRequestException("Email can't be sended");
      }
    }
  }

  async sendGrid(sendEmailDto: SendEmailDto) {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
      to: sendEmailDto.to,
      from: sendEmailDto.from,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    const result = await sgMail.send(msg);
    return result;
  }

  async sparkPost(sendEmailDto: SendEmailDto) {
    const client = new SparkPost(process.env.SPARKPOST_KEY);
    return await client.transmissions.send({
      options: {
        sandbox: true,
      },
      content: {
        from: sendEmailDto.from,
        subject: sendEmailDto.subject,
        html: `<html>
                <body>
                  <p>
                    ${sendEmailDto.text}
                  </p>
                </body>
              </html>`,
      },
      recipients: [{ address: sendEmailDto.to }],
    });
    return 'This works!';
  }
}
