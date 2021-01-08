import { Module } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'libs/common/src';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminusersModule } from './adminusers/adminusers.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { MarksController } from './marks/marks.controller';
import { MarksModule } from './marks/marks.module';
import { OperatemarksModule } from './operatemarks/operatemarks.module';
import { OparticlesModule } from './oparticles/oparticles.module';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ASSESS_KEY_ID,
              accessKeySecret: process.env.OSS_ASSESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET
            }
          })
        }
      }
    }),
    AdminusersModule,
    ArticlesModule,
    CategoriesModule,
    MarksModule,
    OperatemarksModule,
    OparticlesModule
  ],
  controllers: [AdminController, MarksController],
  providers: [AdminService],
})
export class AdminModule { }
