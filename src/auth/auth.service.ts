/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';


export interface UserResult {
  id: number;
  name: string;
  email: string;
};


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User,"knacx")
    private authRepository: Repository<User>, //generic
    private JwtService: JwtService,
    private Configservice: ConfigService,
  ) { }


  async register(userDto: RegisterUserDto): Promise<UserResult> {
    const register = this.authRepository.create(userDto);
    const user = await this.authRepository.save(register);
    const { id, name, email } = user;
    return { 
      id, name, email,
     };
  }

  async findByEmail(email: string): Promise<User | null> {
    try{
      const user = await this.authRepository.findOne({ where: { email } })
      if(!user){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }else{
        return user
      }
    }catch(error){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } 
  }

  async validateUser(email: string, password: string): Promise<UserResult | null> {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user?.password)) {
      const { id, name, email } = user;
      return { id, name, email };
    } else {
      throw new HttpException('Invalid Password or email',HttpStatus.UNAUTHORIZED)
    }
  }

  async login(user: UserResult, reponse: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
      parseInt(this.Configservice.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION'))
    );// getTime for Reference Date and plus JWT expiresIn
    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresAccessToken.getTime() +
      parseInt(this.Configservice.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION'))
    );
    const tokenPayload: UserResult = {
      id: user.id,
      email: user.email,
      name: user.name
    }
    const accessToken = this.JwtService.sign(tokenPayload, {
      secret: this.Configservice.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.Configservice.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION')}ms`
    })
    const refreshToken = this.JwtService.sign(tokenPayload, {
      secret: this.Configservice.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.Configservice.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION')}ms`
    })
    await this.updateRefrshToken(user, refreshToken);
    reponse.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAccessToken
    }).cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresRefreshToken
    })
    throw new HttpException('Login Success',HttpStatus.OK)

  }

  async updateRefrshToken(user: UserResult, refreshToken: string): Promise<void> {
    const userUpdate = await this.findByEmail(user.email) as User;
    userUpdate.refreshToken = await bcrypt.hash(refreshToken,10) ;
    await this.authRepository.save(userUpdate);
  }

  async verrifyRefreshToken(refreshToken: string, useremail: string):Promise<UserResult | null> {
    try {
      const user = await this.findByEmail(useremail);
      const authenticate = await bcrypt.compare(refreshToken, user?.refreshToken as string);
      if(!authenticate){
        throw new HttpException('Refresh Token Expired',HttpStatus.UNAUTHORIZED)
      }
      const { id, name, email } = user as User;
      return { id, name, email };
    } catch (error) {
      throw new HttpException('Refresh Token Expired',HttpStatus.UNAUTHORIZED)
    }
  }

  logout(reponse: Response) {
    reponse.clearCookie('Authentication', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
    });
    reponse.clearCookie('Refresh', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    // ส่งการตอบกลับ
    throw new HttpException('Logout Success',HttpStatus.OK)
  }
}