import { User } from '@libs/db/models/user.model';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';


export class JwtStratrgy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    } as StrategyOptions)
  }

  async validate(id) {
    return await this.userModel.findById(id)
  }
}