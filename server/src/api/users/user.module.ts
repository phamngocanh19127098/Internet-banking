import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AccountsModule),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
