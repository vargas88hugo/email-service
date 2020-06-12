import { Injectable, BadRequestException } from '@nestjs/common';
import * as SparkPost from 'sparkpost';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  private client: SparkPost;

  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      return await this.sparkPost(sendEmailDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Email can't be sended");
    }
  }

  async sparkPost(sendEmailDto: SendEmailDto) {
    this.client = new SparkPost(process.env.SPARKPOST_KEY);
    console.log(process.env.SPARKPOST_KEY);
    return await this.client.transmissions.send({
      options: {
        sandbox: true,
      },
      content: {
        from: 'testing@sparkpostbox.com',
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
  }
}
