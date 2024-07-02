import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpException,
  // HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/user/user.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  // @Get('test')
  // test() {
  //   throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  // }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('author') author: string
  ) {
    return await this.blogService.findAll(author, keyword);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // +id主要适用于类型转换
    const blog = await this.blogService.findOne(id);
    return blog;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.blogService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    createBlogDto.author = req.user.username;
    const res = await this.blogService.create(createBlogDto);
    return res;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: CreateBlogDto) {
    console.log('updateBlogDto=', updateBlogDto);
    return 'ok';
  }
}
