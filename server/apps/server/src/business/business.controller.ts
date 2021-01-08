import { Business } from '@libs/db/models/business.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Business,
  // routes: {
  //   create: false,
  //   update: false,
  //   delete: false
  // }
})
@Controller('business')
@ApiTags('商业名片')
export class BusinessController {
  constructor(
    @InjectModel(Business)
    private readonly model: ReturnModelType<typeof Business>,
  ) {}
}
