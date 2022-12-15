import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

import { sendMail } from 'src/commons/mailing/nodemailer';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { Role, User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existedUsername = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (existedUsername) {
      throw new BadRequestException('User already exists');
    }

    const existedEmail = await this.userRepository.findOneBy({
      username: dto.email,
    });

    if (existedEmail) {
      throw new BadRequestException('Email already exists');
    }

    let pass = randomstring.generate(30);

    console.log(pass);

    sendMail({
      to: dto.email,
      subject: 'Your password for Taixiu Bank',
      html: `<h4>${pass}</h4>`,
    });

    pass = await hash(pass, 10);

    return this.userRepository.save({ ...dto, password: pass });
  }

  async getByLogin({ username, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const checkPassword = compareSync(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Username or password is wrong');
    }

    return user;
  }

  getByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async getByRefresh(refreshToken: string, username: string): Promise<User> {
    const user = await this.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (refreshToken !== user.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ username }, { refreshToken });
  }

  async findAllEmployee() {
    try {
      return await this.userRepository.findBy({ role: Role.EMPLOYEE }); // ???
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async updateEmployee(id: number, updateUserDto: UpdateUserDto) {
    try {
      const employee: User = await this.userRepository.findOneById(id);
      console.log(employee);
      if (!employee) {
        throw new BadRequestException();
      }
      return await this.userRepository.update(id, updateUserDto);
    } catch (e) {}
  }

  async removeEmployee(id: number) {
    try {
      const employee: User = await this.userRepository.findOneById(id);
      if (!employee) {
        throw new BadRequestException();
      }
      return await this.userRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException();
      console.log(e.message);
    }
  }

  async findUserById(id: number) {
    // let user : User = await this.userRepository.createQueryBuilder("user").where("user.id = :id", {id}).getOne();
    // làm mẫu nha
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.transactions', 'transactions')
        .select(['user.id', 'transactions'])
        .where('user.id = :id', { id })
        .getOne();

      if (result == null) {
        throw new BadRequestException('Nguời dùng không tồn tại!');
      }

      return {
        data: {
          result,
        },
        statusCode: 200,
        message: 'Lấy thông tin người dùng thành công!',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi khi đang tìm kiếm nguời dùng!',
      );
    }
  }
}
