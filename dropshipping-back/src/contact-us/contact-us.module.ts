import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { MailService } from 'mail/mail.service';

@Module({
  providers: [ContactUsService,MailService],
  controllers: [ContactUsController]
})
export class ContactUsModule {}
