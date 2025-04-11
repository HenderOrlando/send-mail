import { Body, Controller, Get, Post } from "@nestjs/common";
import { ContactDto } from "./dto/contact.dto";
import { ContactService } from "./contact.service";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendMessage(@Body() dto: ContactDto) {
    try {
      return await this.contactService.handleContact(dto);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to handle contact: ${errorMessage}`);
    }
  }
  @Get()
  getHello(): string {
    return this.contactService.getHello();
  }
}
