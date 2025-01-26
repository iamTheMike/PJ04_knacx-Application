import { Module } from '@nestjs/common';
import { QueueStoreConsumer } from './queue.store.comsumer';

@Module({
    providers:[QueueStoreConsumer]
})
export class QueueStoreModule {}
