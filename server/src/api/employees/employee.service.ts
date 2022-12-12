import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compareSync } from 'bcrypt';

import { CreateEmployeeDto, LoginEmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    dto.password = await hash(dto.password, 10);

    const existed = await this.employeeRepository.findOneBy({
      username: dto.username,
    });

    if (existed) {
      throw new BadRequestException('Employee already exists');
    }

    return this.employeeRepository.save(dto);
  }

  async getByLogin({ username, password }: LoginEmployeeDto) {
    const employee = await this.employeeRepository.findOneBy({ username });

    if (!employee) {
      throw new UnauthorizedException('Employee not found');
    }

    const checkPassword = compareSync(password, employee.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Username or password is wrong');
    }

    return employee;
  }

  getByUsername(username: string): Promise<Employee | undefined> {
    return this.employeeRepository.findOneBy({ username });
  }

  async getByRefresh(refreshToken: string, username: string) {
    const employee = await this.getByUsername(username);

    if (!employee) {
      throw new UnauthorizedException('Invalid token');
    }

    if (refreshToken !== employee.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return employee;
  }

  updateRefreshToken(username: string, refreshToken: string) {
    return this.employeeRepository.update({ username }, { refreshToken });
  }
}
