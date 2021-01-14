import { Adminuser } from '@libs/db/models/adminuser.model';
import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { IStrategyOptions, Strategy } from 'passport-local';

export class LocalStrategy extends PassportStrategy(Strategy, 'local-admin') {
  constructor(
    @InjectModel(Adminuser)
    private adminuserModel: ReturnModelType<typeof Adminuser>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const backuser = await this.adminuserModel
      .findOne({ username })
      .select('+password');
    if (!backuser) {
      throw new BadRequestException('用户名不正确');
    }
    if (!compareSync(password, backuser.password)) {
      throw new BadRequestException('密码不正确');
    }
    return backuser;
  }
}
