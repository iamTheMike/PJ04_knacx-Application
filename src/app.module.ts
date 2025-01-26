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
import { LoggingMiddleWare } from './middleware/logging.middleware';
import { Order } from './order/entities/order.entities';
import { OrderItem } from './order/entities/order.item.entities';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),//read env file
    TypeOrmModule.forRoot(
      {
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: "knacx",
        database: "knacx",
        entities: [Product,User],
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
      entities: [Order,OrderItem],
      synchronize: true

    },
 ),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host:'localhost',
            port:6370,
          }
        })
        return {store ,ttl:30000}
      }
    }),
    AuthModule,
    PassportModule,
    OrderModule,
    ProductModule,
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
