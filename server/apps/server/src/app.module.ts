import { Module } from '@nestjs/common';
import { CommonModule } from 'libs/common/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ArticlesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
