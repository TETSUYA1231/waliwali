import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Category } from './category.model';
import { Mark } from './mark.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Article {
  @ApiProperty({ description: '文章标题' })
  @prop()
  title: string;

  @ApiProperty({ description: '文章作者' })
  @prop({ ref: 'User' })
  author: Ref<User>;

  @ApiProperty({ description: '文章封面图集' })
  @prop()
  cover: string[];

  @ApiProperty({ description: '文章内容' })
  @prop()
  body: string;

  @ApiProperty({ description: '所属用户侧文章标签' })
  @prop({ ref: 'Mark' })
  marks: Ref<Mark>[];

  @ApiProperty({ description: '所属文章分类' })
  @prop({ ref: 'Category' })
  category: Ref<Category>;
}
