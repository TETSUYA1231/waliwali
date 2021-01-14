import { Category } from '@libs/db/models/category.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: Category,
})
@Controller('categories')
@ApiTags('文章目录')
export class CategoriesController {
  constructor(
    @InjectModel(Category)
    private readonly model: ReturnModelType<typeof Category>,
  ) {}
}
