import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { EmployeeService } from 'src/api/employees/employee.service';
import { Employee } from 'src/api/employees/entity/employee.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private employeeService: EmployeeService) {
    super();
  }

  async validate(username: string, password: string): Promise<Employee> {
    const employee = await this.employeeService.getByLogin({
      username,
      password,
    });

    if (!employee) {
      throw new UnauthorizedException();
    }

    return employee;
  }
}
