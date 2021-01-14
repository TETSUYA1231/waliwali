import { Servercate } from '@libs/db/models/servercate.model';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: Servercate,
})
@Controller('servercates')
@ApiTags('运营侧目录')
export class ServercatesController {
  constructor(
    @InjectModel(Servercate)
    private readonly model: ReturnModelType<typeof Servercate>,
  ) {}
}
