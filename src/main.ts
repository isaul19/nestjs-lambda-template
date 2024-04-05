import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Deja entrar solo campos permitidos
      forbidNonWhitelisted: true, // Tira error en caso de que haya un campo no permitido
      transform: true, // Trata de transformar string a number, etc.
    }),
  );

  await app.listen(3000);
}

bootstrap();
