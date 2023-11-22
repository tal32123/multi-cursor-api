import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // Specify the client origin
    methods: '*',
    credentials: false,
  });

  await app.listen(3000);
}
bootstrap();
