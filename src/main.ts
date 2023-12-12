import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Open Api Configuration
  const config = new DocumentBuilder()
    .setTitle('File Flow API')
    .setDescription('File Flow is a NestJS backend server that allows you to effortlessly upload, access, and manage files. With its intuitive API and robust features, File Flow streamlines file handling for developers and users alike.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
