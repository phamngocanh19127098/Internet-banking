import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existed = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (existed) {
      throw new BadRequestException('User already exists');
    }

    let pass = randomstring.generate();

    console.log(pass);

    pass = await hash(pass, 10);

    return this.userRepository.save({ ...dto, pass });
  }

  async getByLogin({ username, password }: LoginUserDto) {
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

  async getByRefresh(refreshToken: string, username: string) {
    const user = await this.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (refreshToken !== user.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  updateRefreshToken(username: string, refreshToken: string) {
    return this.userRepository.update({ username }, { refreshToken });
  }
}
