import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Like, Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly BlogRepository: Repository<Blog>
  ) { }

  async findAll(author: string = '', keyword: string = '') {
    const condition = {};
    if (author) {
      condition['author'] = author;
    }
    if (keyword) {
      condition['title'] = Like(`%${keyword}%`);
    }
    return await this.BlogRepository.find({
      where: condition,
      order: {
        createAt: 'DESC'
      }
    });
  }

  async findOne(id: number) {
    return await this.BlogRepository.findOneBy({ id });
  }

  async create(blog: CreateBlogDto) {
    return await this.BlogRepository.save(blog);
  }

  async remove(id: number) {
    return await this.BlogRepository.delete(id);
  }
}
