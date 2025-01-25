import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  
  static forRoot(databases: DataSourceOptions[]): DynamicModule {
    const imports = databases.map((dbConfig) =>
      TypeOrmModule.forRoot({
        ...dbConfig,
        synchronize: true, 
      }),
    );
   
    return {
      module: DatabaseModule,
      imports,
    };
  }
}


// import { Module } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { Product } from "src/product/entities/product.entities";




// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql' ,
//         host: configService.getOrThrow('DB_HOST'),
//         port: configService.getOrThrow('DB_PORT'),
//         username: configService.getOrThrow('DB_USER'),
//         password:configService.getOrThrow('DB_PASSWORD'),
//         autoLoadEnitities:true,
//         database: "Products",
//         entities: [Product],
//         synchronize: true
//       }),
//       inject: [ConfigService]
//     })
//   ]
// })
// export class DatabaseModule { }