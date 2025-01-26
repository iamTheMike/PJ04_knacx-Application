/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService, UserResult } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto, RegisterUserDto } from './dto/auth-register.dto';
import { CurrentAuth } from './current-auth.decorator';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "Register the user" })
  @ApiCreatedResponse({ description: "new user was created sucessfully" })
  @ApiConflictResponse({ description: "User's email already exists" })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @Post('register')
  async register(@Body() RegisterDto: RegisterUserDto) {
    return await this.authService.register(RegisterDto);
  }

  @ApiOperation({ summary: "Login user" })
  @ApiBody({
    description: 'User credentials',
    type: LoginDto,
    required: true,
  })
  @ApiOkResponse({ description: "Login Successfuly and Auth JWT was sent to Auth Cokie" })
  @ApiUnauthorizedResponse({ description: "Invalid Password or email'" })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentAuth() user: UserResult, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response);
  }

  @ApiOperation({ summary: "Refresh JWT " })
  @ApiOkResponse({ description: "Login Successfuly and Auth token was sent to Cokie" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Expried Refresh Token" })
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@CurrentAuth() user: UserResult, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response);
  }

  @ApiOperation({ summary: "Logout sucessfully and Auth cookie was destroy" })
  @ApiOkResponse({ description: "Logout Successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

}
