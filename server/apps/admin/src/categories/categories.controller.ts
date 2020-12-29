import { Category } from '@libs/db/models/category.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Category
})
@Controller('categories')
@ApiTags('文章分类')
export class CategoriesController {
  constructor(
    @InjectModel(Category) private readonly model: ReturnModelType<typeof Category>
  ) { }

  @Get('option')
  option() {
    return {
      title: '分类管理',
      column: [
        { prop: "name", label: "分类名称" }
      ],
    }
  }
}
