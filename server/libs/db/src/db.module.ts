import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Adminuser } from './models/adminuser.model';
import { Article } from './models/article.model';
import { Category } from './models/category.model';
import { Mark } from './models/mark.model';
import { User } from './models/user.model';
import { Action } from './models/action.model';
import { Comment } from './models/comment.model';
import { Business } from './models/business.model';
import { Operatemark } from './models/operatemark.model';
import { Oparticle } from './models/oparticle.model';
import { Servercate } from './models/servercate.model';

const models = TypegooseModule.forFeature([
  Adminuser,
  Article,
  Category,
  Mark,
  User,
  Action,
  Comment,
  Business,
  Operatemark,
  Oparticle,
  Servercate,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
