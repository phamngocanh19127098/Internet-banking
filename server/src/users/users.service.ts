import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // hash password
      const passwordHash = this.setPasswordHash(createUserDto.password);
      createUserDto.password = await passwordHash;
      createUserDto.accountNumber = this.createRandomPaymentAccount(7);
      const user: User = await this.usersRepository.save(createUserDto);
      return {
        message: 'User created successfully!',
        data: user,
      };
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        let message = '';
        if (e.message.toString().search('username') !== -1) {
          message = 'Username is exist!';
        } else if (e.message.toString().search('email') !== -1) {
          message = 'Email is exist!';
        } else if (e.message.toString().search('accountNumber') !== 1) {
          createUserDto.accountNumber = this.createRandomPaymentAccount(7);
          const user: User = await this.usersRepository.save(createUserDto);
        } else {
          message = 'Something went wrong!';
        }
        return {
          message: message,
        };
      }
      return {
        message: 'Something went wrong!',
        error: e.message,
      };
    }
  }

  async setPasswordHash(password) {
    return await bcrypt.hash(password, 10);
  }

  createRandomPaymentAccount(len) {
    let randomAccount = '';
    const character = '0987654321';
    for (let i = 0; i < len; i++) {
      randomAccount += character.charAt(
        Math.floor(Math.random() * character.length),
      );
    }
    return randomAccount;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
