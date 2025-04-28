import { Controller,Post,Body } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsDTO } from './dto/contact-us.dto';

@Controller('contact')
export class ContactUsController {

constructor(private contactService : ContactUsService)   {}

@Post() 
async sendContactMessage(@Body() contactDTO : ContactUsDTO) {
return this.contactService.sendMessage(contactDTO)
}


}
