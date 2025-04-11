import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import * as bodyParser from "body-parser";

const expressApp = express();
expressApp.use(bodyParser.json());

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // importante para que convierta al tipo DTO
    }),
  );
  await app.init();
  /*await app.listen(process.env.PORT ?? 3000);*/
}

bootstrap();

export const handler = expressApp;
