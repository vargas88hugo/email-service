import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
