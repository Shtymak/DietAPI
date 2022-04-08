import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto{
  @ApiProperty({example: "user@gmail.com", description:"Електронна пошта"})
  email: string
  @ApiProperty({example: "fwipf123AA", description:"Пароль"})
  password: string

}