import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Article } from './article.model';
import { Category } from './category.model';

export class Operatemark {
  @ApiProperty({ description: '运营侧文章标签' })
  @prop()
  name: string;

  @prop()
  article: Ref<Article>;

  @prop()
  category: Ref<Category>;
}
