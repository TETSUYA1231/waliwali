import { Adminuser } from '@libs/db/models/adminuser.model';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';

export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Adminuser)
    private adminuserModel: ReturnModelType<typeof Adminuser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  async validate(id: any) {
    return await this.adminuserModel.findById(id);
  }
}
