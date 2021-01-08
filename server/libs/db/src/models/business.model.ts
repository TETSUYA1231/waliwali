import { ApiProperty } from '@nestjs/swagger';
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Business {
  @ApiProperty({ description: '公司名' })
  @prop()
  company: string;

  @ApiProperty({ description: '公司封面图' })
  @prop()
  cover: string;

  @ApiProperty({ description: '主营业务' })
  @prop()
  tags: string[];

  @ApiProperty({ description: '职称' })
  @prop()
  title: string;

  @ApiProperty({ description: '联系方式' })
  @prop()
  phone: string;

  @ApiProperty({ description: '公司描述' })
  @prop()
  desc: string;

  @ApiProperty({ description: '关联的用户' })
  @prop({ ref: 'User' })
  user: Ref<User>;
}
