import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";

const expressApp = express();
expressApp.use(bodyParser.json());
let cachedApp: express.Express | null = null;

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
  return expressApp;
}

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  return cachedApp(req, res);
}
