import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma o corpo da requisição para o DTO
      whitelist: true, // ignora propriedades que vierem no json que nao estao no DTO
      forbidNonWhitelisted: true, // lanca um erro, caso tenha um dado no json que nao esteja no DTO
    })
  ); 

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
