import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStratrgy } from './local.strategy';
import { JwtStratrgy } from './jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [LocalStratrgy, JwtStratrgy],
})
export class AuthModule {}
