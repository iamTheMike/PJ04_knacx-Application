import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(databases: { [key: string]: TypeOrmModuleOptions }): DynamicModule {
    const modules = Object.keys(databases).map((dbName) =>
      TypeOrmModule.forRootAsync({
        name: dbName, 
        useFactory: () => databases[dbName], 
      }),
    );

    return {
      module: DatabaseModule,
      imports: modules,
      exports: modules, // ทำให้สามารถใช้งานโมดูลนี้ในที่อื่นได้
    };
  }
}
