import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { compareSync, hash } from 'bcrypt';
import { InvalidCredentialsException } from 'src/commons/filters/exceptions/auth/InvalidCredentialsException';
import {
  FailLoginException,
  InvalidTokenException,
} from 'src/commons/filters/exceptions/auth';
import { sendMail } from 'src/commons/mailing/nodemailer';
import {
  EmailExistedException,
  UsernameExistedException,
  UserUnexistingException,
} from 'src/commons/filters/exceptions/users';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { Role, User } from './entity/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

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
      throw new UsernameExistedException();
    }

    const existedEmail = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (existedEmail) {
      throw new EmailExistedException();
    }

    const pass = randomstring.generate(30);

    console.log('Password:', pass);

    await sendMail({
      to: dto.email,
      subject: 'Your password for Taixiu Bank',
      html: `<p>Dear <strong>${dto.username}</strong>,</p>
      <p>Your password is: <strong>${pass}</strong></p>
      <p>Thank for using our bank,</p>
      <p><strong>TAIXIU BANK</strong></p>`,
    });

    const hashPassword = await hash(pass, 10);

    return this.userRepository.save({ ...dto, password: hashPassword });
  }

  async getByLogin({ username, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UserUnexistingException();
    }

    const checkPassword = compareSync(password, user.password);

    if (!checkPassword) {
      throw new FailLoginException();
    }

    if (user.status === 1) {
      throw new BadRequestException('Tài khoản của bạn đã bị đóng.');
    }

    return user;
  }

  getByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async getByRefresh(refreshToken: string, username: string): Promise<User> {
    const user = await this.getByUsername(username);

    if (!user) {
      throw new InvalidTokenException();
    }

    if (refreshToken !== user.refreshToken) {
      throw new InvalidCredentialsException();
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
      const employee = await this.userRepository.findBy({
        role: Role.EMPLOYEE,
      });
      for (const e of employee) {
        delete e.password;
      }
      return employee;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findAllCustomer() {
    try {
      const customer = await this.userRepository.findBy({
        role: Role.CUSTOMER,
      });
      for (const e of customer) {
        delete e.password;
      }
      return customer;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async updateEmployee(id: number, updateUserDto: UpdateUserDto) {
    try {
      const employee: User = await this.userRepository.findOneBy({ id });
      if (!employee) {
        throw new BadRequestException('Nhân viên không tồn tại');
      }
      return this.userRepository.update(id, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình cập nhập nhân viên',
      );
    }
  }

  async removeEmployee(id: number) {
    try {
      const employee: User = await this.userRepository.findOneBy({ id });
      if (!employee) {
        throw new BadRequestException('Nhân viên không tồn tại');
      }
      return this.userRepository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình xóa nhân viên',
      );
    }
  }

  getUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  getUserByUsername(username: string) {
    try {
      return this.userRepository.findOneBy({
        username,
        role: Role.CUSTOMER,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'Xảy ra lỗi từ server khi tìm kiếm người dùng bằng Username',
      );
    }
  }

  getAccessTokenFromClient(authorization: string) {
    return authorization.slice(7);
  }
}
