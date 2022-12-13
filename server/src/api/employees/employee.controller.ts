import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';

import { CreateEmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Controller('employees')
@ApiTags("employees")
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(dto);
  }
}
