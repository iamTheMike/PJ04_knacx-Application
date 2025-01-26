/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
  })); //useGlobalPipes is a method that allows you to apply a pipe to all routes in the application
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}


bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
