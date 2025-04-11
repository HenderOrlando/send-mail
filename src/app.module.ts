import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ContactController } from "./contact/contact.controller";
import { ContactService } from "./contact/contact.service";
import { MailModule } from "./mail/mail.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MailModule],
  controllers: [ContactController, AppController],
  providers: [ContactService, AppService],
})
export class AppModule {}
