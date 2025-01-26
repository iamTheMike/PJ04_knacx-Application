import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send.email.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags("Send Email with Queue system")
@Controller('email')
export class EmailController {

    constructor(private readonly emailService: EmailService) { }

    @ApiOperation({ summary: "Send Email" })
    @ApiOkResponse({ description: "Email was send sucessfully" })
    @ApiBadRequestResponse({ description: "Invalid data provided" })
    @Post()
    async sendMail(@Body() emailDto: SendEmailDto) {
        return await this.emailService.sendEmail(emailDto);
    }
}
