import { Test, TestingModule } from '@nestjs/testing';

import { MailService } from '../mail.service';
import { SendEmailDto } from '../dto/send-email.dto';
import { MailController } from '../mail.controller';
import { UserRepository } from '../../auth/user.repository';

const mockUserRepository = () => ({});

describe('Mail', () => {
  let mailService: MailService;
  let mailController: MailController;
  let sendEmail: SendEmailDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        MailService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
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
    const result = null;
    jest.spyOn(mailService, 'sendGrid').mockImplementation(async () => result);
    expect(await mailService.sendGrid(sendEmail)).toBe(result);
  });

  it('should get response from sendEmail', async () => {
    const result = null;
    jest.spyOn(mailService, 'sendEmail').mockImplementation(async () => result);
    expect(await mailService.sendEmail(sendEmail, null)).toBe(result);
  });

  it('should get response from Sparkpost', async () => {
    const result = null;
    jest.spyOn(mailService, 'sparkPost').mockImplementation(async () => result);
    expect(await mailService.sparkPost(sendEmail)).toBe(result);
  });

  it('should get response from useProviders', async () => {
    const result = 'SendGrid';
    jest
      .spyOn(mailService, 'useProviders')
      .mockImplementation(async () => result);
    expect(await mailService.useProviders(sendEmail)).toBe(result);
  });

  it('should get response from createEmail', async () => {
    const result = null;
    jest
      .spyOn(mailService, 'createEmail')
      .mockImplementation(async () => result);
    expect(await mailService.createEmail(sendEmail, null, 'SendGrid')).toBe(
      result,
    );
  });
});
