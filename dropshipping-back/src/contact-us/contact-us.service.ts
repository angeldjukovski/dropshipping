import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailService } from 'mail/mail.service';
import { ContactUsDTO } from './dto/contact-us.dto';

@Injectable()
export class ContactUsService {

constructor(private mailService : MailService)  {}  

async sendMessage (contactDTO : ContactUsDTO)  {

const {name,email,message} = contactDTO   

const sender = email ? `${name} <${email}>` : name;
const subject = `Message from ${name}` 
const text =  `From ${sender}\n\n${message}` 

try {
await this.mailService.sendMail('bookcraftstore@gmail.com', subject, text)
return { success: true, message: 'Message sent successfully' }
} catch (error) {
throw new InternalServerErrorException('Failed to send message');
}

}

}
