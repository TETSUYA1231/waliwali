import { Module } from '@nestjs/common';
import { CommonModule } from 'libs/common/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { BusinessController } from './business/business.controller';
import { BusinessModule } from './business/business.module';
import { MarksModule } from './marks/marks.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ArticlesModule,
    ActionsModule,
    CommentsModule,
    BusinessModule,
    MarksModule
  ],
  controllers: [AppController, CommentsController, BusinessController],
  providers: [AppService],
})
export class AppModule { }
