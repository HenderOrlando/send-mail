import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFile } from "fs/promises";
import { ConfigService } from "@nestjs/config";
import { ContactDto } from "src/contact/dto/contact.dto";

@Injectable()
export class MailService {
  private readonly templatePath = __dirname + "/../templates/contact-email.hbs";
  constructor(private readonly config: ConfigService) {}

  private getConfigValue<T>(key: string): T {
    const value = this.config.get<T>(key);
    if (value === undefined || value === null) {
      throw new Error(`Configuration key "${key}" is missing or invalid.`);
    }
    return value;
  }

  private async getContactHtml(data: ContactDto, templatePath?: string) {
    try {
      const template = await this.readTemplate(
        templatePath ?? this.templatePath,
      );

      return Handlebars.compile(template)(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      throw new Error(`Failed to compile email template: ${errorMessage}`);
    }
  }

  private async readTemplate(filePath: string): Promise<string> {
    try {
      return await readFile(filePath, "utf8");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      throw new Error(`Error reading file: ${errorMessage}`);
    }
  }

  async sendContactEmail(data: ContactDto) {
    const transporter = nodemailer.createTransport({
      host: this.getConfigValue<string>("MAIL_HOST") || "",
      port: this.getConfigValue<number>("MAIL_PORT") || 587,
      auth: {
        user: this.getConfigValue<string>("MAIL_USER") || "",
        pass: this.getConfigValue<string>("MAIL_PASS") || "",
      },
    });

    const html: string = await this.getContactHtml(data);

    await transporter.sendMail({
      from: this.getConfigValue<string>("MAIL_FROM"),
      to: this.getConfigValue<string>("MAIL_TO"),
      subject: `Nuevo contacto: ${data.nombre} ${data.apellido}`,
      html,
    });
  }
}
