import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send.email.dto';

@Controller('email')
export class EmailController {

    constructor(private readonly emailService : EmailService){}

    @Post()
    async sendMail(@Body() emailDto:SendEmailDto){
        return await this.emailService.sendEmail(emailDto);
    }
}
