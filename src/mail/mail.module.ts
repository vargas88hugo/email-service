import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { MailRepository } from './mail.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserRepository, MailRepository]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
