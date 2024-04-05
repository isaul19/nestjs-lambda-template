import { configure as serverlessExpress } from '@vendia/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let cachedServer: Handler;

export const handler = async (event, context: Context, callback: any) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();

    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Deja entrar solo campos permitidos
        forbidNonWhitelisted: true, // Tira error en caso de que haya un campo no permitido
        transform: true, // Trata de transformar string a number, etc.
      }),
    );

    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context, callback);
};
