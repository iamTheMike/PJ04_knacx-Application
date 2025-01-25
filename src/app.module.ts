import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/entities/auth.entities';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './_database/database.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entities';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),//read env file
    DatabaseModule.forRoot([
      {
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "Products",
        entities: [Product],
        synchronize: true

      },
      {
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "Users",
        entities: [User],
        synchronize: true,
      },
    ]),//connect to database
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host:'localhost',
            port:6379
          }
        })
        return {store }
      }
    }),
    AuthModule,
    PassportModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {

  }
}
