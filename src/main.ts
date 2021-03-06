import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
const fileUpload = require('express-fileupload')
async function bootstrap() {
  const PORT = process.env.PORT||3000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.use(fileUpload({}))
  const config = new DocumentBuilder()
    .setTitle('War Team API')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(PORT, ()=>console.log(`Server started on port = ${PORT}`));
}
bootstrap();
