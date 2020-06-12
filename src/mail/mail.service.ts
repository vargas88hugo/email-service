import { Injectable } from '@nestjs/common';
import * as SparkPost from 'sparkpost';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  private client: SparkPost;

  constructor() {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      await this.sparkPost(sendEmailDto);
    } catch (error) {
      console.log('ups');
    }
  }

  async sparkPost(sendEmailDto: SendEmailDto) {
    this.client = new SparkPost(process.env.SPARKPOST_KEY);
    const response = await this.client.transmissions.send({
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

    console.log(response);

    return response;
  }
}
