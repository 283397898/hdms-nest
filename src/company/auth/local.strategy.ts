import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'empUsername',
      passwordField: 'empPassword',
    });
  }

  async validate(empUsername: string, empPassword: string): Promise<any> {
    const user = await this.authService.validateUser(empUsername, empPassword);
    if (!user) {
      throw new HttpException('账号或密码错误', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
