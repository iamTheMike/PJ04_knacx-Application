import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send.email.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class EmailService {

    constructor(@InjectQueue('emailQueue') private readonly emailQueue: Queue) { }

    async sendEmail(emailDto: SendEmailDto) {
        await this.emailQueue.add('sendEmail',
            { ...emailDto, createdAt: new Date() },
            { attempts: 5, })
        throw new HttpException('Email was send sucessfully', HttpStatus.OK)
    }
}



