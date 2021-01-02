import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Article } from "./article.model";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Action {
  @prop({ ref: 'User' })
  user: Ref<User>

  @prop({ enum: ['Article', 'Business'] })
  type: string

  @prop({ refPath: 'type' })
  // object: Ref<Article | Bussiness>
  object: Ref<Article>

  @prop({ enum: ['like', 'favorite'] })
  name: string
}