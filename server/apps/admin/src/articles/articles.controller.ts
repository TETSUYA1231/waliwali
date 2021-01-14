import { Article } from '@libs/db/models/article.model';
import { Category } from '@libs/db/models/category.model';
import { Mark } from '@libs/db/models/mark.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: Article,
})
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article)
    private readonly model: ReturnModelType<typeof Article>,
    @InjectModel(Category)
    private readonly CategoryModel: ReturnModelType<typeof Category>,
    @InjectModel(Mark) private readonly MarkModel: ReturnModelType<typeof Mark>,
  ) {}
}
