import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
  @ApiProperty({example: "user@gmail.com", description:"Електронна пошта"})
  email: string;
  @ApiProperty({example: "Ростилав", description:"Імʼя"})
  name: string;
  @ApiProperty({example: "fwipf123AA", description:"Пароль"})
  password: string;
}