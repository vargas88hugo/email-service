import { Test, TestingModule } from '@nestjs/testing';

import { MailService } from '../mail.service';
import { SendEmailDto } from '../dto/send-email.dto';
import { MailRepository } from '../mail.repository';
import { User } from '../../auth/user.entity';
import { MailController } from '../mail.controller';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

const mockMailRepository = () => ({
  createQueryBuilder: jest.fn(),
});

const mockUser: User = {
  id: 1,
  email: 'mock@email.com',
  password: 'Mockpassword123',
  salt: null,
  mails: null,
  save: null,
  remove: null,
  hasId: null,
  softRemove: null,
  recover: null,
  reload: null,
};

describe('Mail', () => {
  let mailService: MailService;
  let mailController: MailController;
  let sendEmail: SendEmailDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        MailService,
        { provide: MailRepository, useFactory: mockMailRepository },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
    sendEmail = {
      to: 'vargas88hugo@gmail.com',
      subject: 'test subject',
      text: 'test text',
    };
  });

  it('should get response from sendEmail', async () => {
    const result = 'Mock Sending';
    jest
      .spyOn(mailService, 'sendEmail')
      .mockImplementationOnce(async () => result);
    expect(await mailController.sendEmail(sendEmail, mockUser)).toBe(result);
  });

  it('should get response from useProviders', async () => {
    const result = 'Email has been sended to vargas88hugo@gmail.com';
    jest
      .spyOn(mailService, 'useProviders')
      .mockImplementationOnce(async () => result);
    jest
      .spyOn(mailService, 'createEmail')
      .mockImplementationOnce(async () => {});
    expect(await mailService.sendEmail(sendEmail, null)).toBe(result);
  });

  it('should return a list of mails', async () => {
    const result = [];
    jest
      .spyOn(mailService, 'getEmails')
      .mockImplementationOnce(async () => result);
    expect(await mailController.getEmails(mockUser)).toBe(result);
  });

  it('throws an unauthorized exception as user is wrong in sendEmail', async () => {
    await expect(mailController.sendEmail(null, null)).rejects.toThrow();
  });

  it('throws an unauthorized exception as user is wrong in getEmails', async () => {
    await expect(mailController.getEmails(null)).rejects.toThrow();
  });
});
