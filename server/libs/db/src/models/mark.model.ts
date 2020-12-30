import { ApiProperty } from "@nestjs/swagger";
import { prop, Ref } from "@typegoose/typegoose";
import { Article } from "./article.model";

export class Mark {
  @ApiProperty({ description: '文章标签' })
  @prop()
  name: string

  @prop()
  article: Ref<Article>
}