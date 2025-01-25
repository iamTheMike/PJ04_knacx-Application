import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { LocalStrategy } from './strategies/local.strategies';
import { JwtStrategy } from './strategies/่jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { Product } from 'src/product/entities/product.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Product]),
    JwtModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,JwtRefreshStrategy],
})
export class AuthModule { }
