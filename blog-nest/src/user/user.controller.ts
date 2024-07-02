import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginUserDTO } from './dto/login.dto';
import { UserService } from './user.service';
import { AuthGuard } from './user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.userService.findOne(loginUserDTO);
  }

  // 接口需要登录
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
