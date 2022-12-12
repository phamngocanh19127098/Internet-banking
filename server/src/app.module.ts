import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeModule } from 'src/api/employees/employee.module';
import { AuthModule } from 'src/api/auth/auth.module';
import { Employee } from 'src/api/employees/entity/employee.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'internet_banking',
      entities: [User, Employee],
      synchronize: false,
    }),
    UsersModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
