import { Controller, Post, Body } from '@nestjs/common';

import { CreateEmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(dto);
  }
}
