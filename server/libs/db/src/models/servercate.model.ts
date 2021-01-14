import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Article } from './article.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Servercate {
  @ApiProperty({ description: '分类名称' })
  @prop()
  name: string;

  @prop()
  article: Ref<Article>;
}
