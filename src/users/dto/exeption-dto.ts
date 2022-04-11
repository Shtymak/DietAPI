import { ApiProperty } from "@nestjs/swagger";

export class ExeptionDto {
  @ApiProperty({example: "message", description:"Помилка"})
  message: string
}