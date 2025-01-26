/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import {  Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Job } from "bull";
import * as nodemailer from 'nodemailer';


@Processor('emailQueue')
export class EmailQueueProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: Logger
    
    ) { }

    @Process('sendEmail')
    async handleSendEmail(job: Job) {
       
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            port: this.configService.getOrThrow('EMAIL_PORT'),
            auth: {
                user: this.configService.getOrThrow('EMAIL'),
                pass: this.configService.getOrThrow('EMAIL_PASSWORD')
            }
        })
        const {recipients,subject,html,createdAt } = job.data;
        
           const option: nodemailer.SendMailOptions={
               from: this.configService.getOrThrow('EMAIL'),
               to:recipients,
               subject: subject,
               html:html,
           }
           try{
               await transporter.sendMail(option);
                
           }catch(error){
            this.logger.error(`Error sending email: ${error.message}`, error.stack);

        }
           return { jobId: job.id,createdAt,success: true  };

    }

     @OnQueueCompleted()
         onCompleted(job:Job, result:any){
            const CompletedAt = new Date();
            const duration = CompletedAt.getTime() - new Date(result.createdAt).getTime();
            console.log('(Global) on completed :',result , 'CompletedAt :',CompletedAt, 'Duratiom:', duration,'ms' )
            
          
         
        }
}
