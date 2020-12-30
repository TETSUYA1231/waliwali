import { Article } from '@libs/db/models/article.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Article,
  routes: {
    create: false,
    update: false,
    delete: false
  }
})
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article) private readonly model: ReturnModelType<typeof Article>
  ) { }

  @Get()
  async articles() {
    return await this.model.find({}).populate('marks').populate('category').exec()
  }
}

