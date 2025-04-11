import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ContactController } from "./contact/contact.controller";
import { ContactService } from "./contact/contact.service";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MailModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class AppModule {}
