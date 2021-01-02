import { Module } from '@nestjs/common';
import { CommonModule } from 'libs/common/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ArticlesModule,
    ActionsModule,
    CommentsModule
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService],
})
export class AppModule { }
