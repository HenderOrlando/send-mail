import { IsEmail, IsNotEmpty } from "class-validator";

export class ContactDto {
  @IsNotEmpty()
  nombre!: string;

  @IsNotEmpty()
  apellido!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  telefono!: string;

  @IsNotEmpty()
  mensaje!: string;
}
