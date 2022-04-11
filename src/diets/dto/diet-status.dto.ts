import { ApiProperty } from "@nestjs/swagger";

export class DietStatusDto {
  @ApiProperty({name: "Статус операції", example: "OK"})
  status: string
}