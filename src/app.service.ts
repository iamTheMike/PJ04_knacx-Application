import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('DB Type:', process.env.DB_TYPE)
    return 'Hello World!';
  }
}
