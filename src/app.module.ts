import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/entities/auth.entities';
import { PassportModule } from '@nestjs/passport';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entities';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-ioredis-yet';
import { LoggingMiddleWare } from './_middleware/logging.middleware';
import { Order } from './order/entities/order.entities';
import { OrderItem } from './order/entities/order.item.entities';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(
      {
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: "knacx",
        database: "knacx",
        entities: [Product, User],
        synchronize: true

      },
    ),
    TypeOrmModule.forRoot(
      {
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: "knacx_orders",
        database: "knacx_orders",
        entities: [Order, OrderItem],
        synchronize: true

      },
    ),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6370,
          ttl: 30000,
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6370
      }
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        }
      }
    }),
    AuthModule,
    PassportModule,
    OrderModule,
    ProductModule,
    MailerModule,
    EmailModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleWare).forRoutes('*')
  }


}
