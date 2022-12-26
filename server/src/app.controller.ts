import { Controller, Get } from '@nestjs/common';
import { Role } from './api/users/entity/user.entity';
import { AppService } from './app.service';
import { Roles } from './commons/decorator/roles.decorator';
import { User } from './commons/decorator/user.decorato';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(Role.CUSTOMER)
  @Get()
  getHello(@User() user): string {
    
    return this.appService.getHello();
  }
}
