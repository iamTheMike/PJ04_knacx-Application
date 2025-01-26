/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService, UserResult } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/auth-register.dto';
import { CurrentAuth } from './current-auth.decorator';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() RegisterDto: RegisterUserDto) {
    return await this.authService.register(RegisterDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard) 
  async login(@CurrentAuth() user: UserResult, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentAuth() user: UserResult) {
    return user;
  }
 
  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@CurrentAuth() user: UserResult, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard) 
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

}
