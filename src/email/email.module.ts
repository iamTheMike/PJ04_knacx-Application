import { Logger, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { EmailQueueProcessor } from './email.queue.process';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue', 
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService,EmailQueueProcessor,Logger]
})
export class EmailModule { }
