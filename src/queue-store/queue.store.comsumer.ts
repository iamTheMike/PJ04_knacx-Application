import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";



@Processor('emailQueue')
export class QueueStoreConsumer{





    @Process()
     store(job: Job<unknown>){
        return {sucess:true, jobId: job.id, data: job.data};
    }

    @OnQueueCompleted()
     onGlobalCompleted(jobId:number, result:any){
        console.log(`(Global) on completed: Job ${jobId} --> result : ${result}`)
    }
}