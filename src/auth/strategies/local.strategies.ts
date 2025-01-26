
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {  Injectable } from '@nestjs/common';
import { AuthService, UserResult } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserResult | null> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
} 