import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/my-logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
