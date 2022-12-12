import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
