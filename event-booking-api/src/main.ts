import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
//import dotenv config from dotenv config
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT ?? 3003;
  await app.listen(port ?? 3005);
  console.log('listening on port ', process.env.PORT);
}
bootstrap();
