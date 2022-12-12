import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EmployeeService } from 'src/api/employees/employee.service';
import { Employee } from 'src/api/employees/entity/employee.entity';
import {
  CreateEmployeeDto,
  LoginEmployeeDto,
} from 'src/api/employees/dto/employee.dto';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateEmployeeDto) {
    const employee = await this.employeeService.create(dto);

    const token = await this.signToken(employee.username);

    return {
      username: employee.username,
      ...token,
    };
  }

  async login(loginDto: LoginEmployeeDto) {
    const employee = await this.employeeService.getByLogin(loginDto);
    const token = await this.signToken(employee.username);

    return {
      username: employee.username,
      ...token,
    };
  }

  async validateEmployee(username: string): Promise<Employee> {
    const employee = await this.employeeService.getByUsername(username);

    if (!employee) {
      throw new UnauthorizedException('Invalid token');
    }

    return employee;
  }

  async signToken(username: string, refresh = false) {
    const accessToken = this.jwtService.sign({ username });

    if (!refresh) {
      const refreshToken = this.jwtService.sign(
        { username },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      );

      await this.employeeService.updateRefreshToken(username, refreshToken);

      return {
        accessToken,
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        refreshToken,
        expiresInRefresh: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      };
    } else {
      return {
        accessToken,
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      };
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      const employee = await this.employeeService.getByRefresh(
        refreshToken,
        payload.username,
      );

      const token = await this.signToken(employee.username, true);

      return {
        username: employee.username,
        ...token,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(employee: Employee) {
    await this.employeeService.updateRefreshToken(employee.username, null);
  }
}
