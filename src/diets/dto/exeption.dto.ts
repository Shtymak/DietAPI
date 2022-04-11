import { ApiProperty } from "@nestjs/swagger";

export class DietExeptionDto{
  @ApiProperty({example: 'XXX', description:"Помилка"})
  statusCode: number
  @ApiProperty({example: 'message', description:"Статус помилки"})
  message: string
}