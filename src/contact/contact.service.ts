import { Injectable } from "@nestjs/common";
import { ContactDto } from "./dto/contact.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async handleContact(dto: ContactDto) {
    await this.mailService.sendContactEmail(dto);
    return { success: true, message: "Correo enviado con éxito" };
  }
}
