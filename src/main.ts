import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { JwtGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtGuard(reflector));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1', { exclude: [] });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
