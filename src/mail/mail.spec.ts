import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import * as SparkPost from '../../node_modules/sparkpost';
import { SendEmailDto } from './dto/send-email.dto';

jest.mock('sparkpost');

describe('Mail', () => {
  let mailService: MailService;
  let sendEmail: SendEmailDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    mailService = module.get<MailService>(MailService);

    sendEmail = {
      from: 'host@email.com',
      to: 'test@email.com',
      subject: 'any subject',
      text: 'any text',
    };
    SparkPost.mockReset();
  });

  it('nothing', () => {});

  // it('should get response from Sparkpost', async () => {
  //   SparkPost.mockResolvedValue({});
  //   expect(await mailService.sendEmail(sendEmail)).rejects.toThrow();
  // });
});
