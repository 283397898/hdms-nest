import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { privateKey, publicKey } from 'src/keys';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    CacheModule.register(),
    EmployeeModule,
    PassportModule,
    JwtModule.register({
      publicKey: publicKey,
      privateKey: privateKey,
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
