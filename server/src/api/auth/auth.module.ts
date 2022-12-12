import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { EmployeeModule } from 'src/api/employees/employee.module';
import { JwtStrategy } from 'src/commons/strategy/jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    EmployeeModule,
    ConfigModule.forRoot({}),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
