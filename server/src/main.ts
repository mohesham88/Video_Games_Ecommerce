import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.setGlobalPrefix('api/v1', {exclude : []})
  await app.listen(3000);
}
bootstrap();
