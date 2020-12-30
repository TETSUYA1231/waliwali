import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { LocalStratrgy } from './local.stratrgy';
import { JwtStratrgy } from './jwt.stratrgy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [LocalStratrgy, JwtStratrgy]
})
export class AuthModule { }
