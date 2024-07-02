import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform/transform.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 添加全局前缀
  app.setGlobalPrefix('/api');

  // 注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局筛选器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
