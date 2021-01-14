import { Adminuser } from '@libs/db/models/adminuser.model';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: Adminuser,
})
@Controller('adminuser')
@ApiTags('管理员列表')
export class AdminuserController {
  constructor(
    @InjectModel(Adminuser)
    private readonly model: ReturnModelType<typeof Adminuser>,
  ) {}
}
