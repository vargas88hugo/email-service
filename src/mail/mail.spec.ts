import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import * as SparkPost from '../../node_modules/sparkpost';
import { SendEmailDto } from './dto/send-email.dto';
import { MailController } from './mail.controller';
import { ClientResponse } from '@sendgrid/client/src/response';
import * as axios from 'axios';

jest.mock('sparkpost');

describe('Mail', () => {
  let mailService: MailService;
  let mailController: MailController;
  let sendEmail: SendEmailDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
    sendEmail = {
      from: 'vargas88hugo@gmail.com',
      to: 'vargas88hugo@gmail.com',
      subject: 'test subject',
      text: 'test text',
    };
  });

  it('should get response from SendGrid', async () => {
    const result: [ClientResponse, {}] = [null, {}];
    jest.spyOn(mailService, 'sendGrid').mockImplementation(async () => result);
    expect(await mailService.sendGrid(sendEmail)).toBe(result);
  });

  it('should get response from sendEmail', async () => {
    const result: [ClientResponse, {}] = [null, {}];
    jest.spyOn(mailService, 'sendEmail').mockImplementation(async () => result);
    expect(await mailService.sendEmail(sendEmail)).toBe(result);
  });

  it('should get response from Sparkpost', async () => {
    const result = {
      results: {
        total_rejected_recipients: 0,
        total_accepted_recipients: 1,
        id: '123',
      },
    };
    jest.spyOn(mailService, 'sparkPost').mockImplementation(async () => result);
    expect(await mailService.sparkPost(sendEmail)).toBe(result);
  });
});
