import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginUserDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }
  async findOne(loginUserDTO: LoginUserDTO) {
    const { username, password } = loginUserDTO;
    const user = await this.userRepository.findOneBy({ username, password });
    if (user === null) {
      throw new HttpException('用户名或者密码错误', HttpStatus.BAD_REQUEST);
    }
    const payload = { username: user.username, id: user.id };
    // return user;
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
