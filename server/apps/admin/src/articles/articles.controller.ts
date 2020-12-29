import { Article } from '@libs/db/models/article.model';
import { Category } from '@libs/db/models/category.model';
import { Mark } from '@libs/db/models/mark.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Article
})
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article) private readonly model: ReturnModelType<typeof Article>,
    @InjectModel(Category) private readonly CategoryModel: ReturnModelType<typeof Category>,
    @InjectModel(Mark) private readonly MarkModel: ReturnModelType<typeof Mark>
  ) { }

  @Get('option')
  async option() {
    const categories = (await this.CategoryModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    const marks = (await this.MarkModel.find()).map(i => ({
      label: i.name,
      value: i._id
    }))
    return {
      title: '文章管理',
      searchMenuSpan: 8,
      column: [
        { prop: "title", label: "文章标题", sortable: true, search: true, regex: true, span: 24 },
        { prop: "category", label: "文章分类", type: 'select', dicData: categories, span: 12 },
        { prop: "marks", label: "文章标签", type: 'select', dicData: marks, multiple: true, span: 12 },
        { prop: "cover", label: "文章封面图", type: 'upload', width: 160, listType: 'picture-img', span: 24, action: 'upload' }
      ],
    }
  }
}
