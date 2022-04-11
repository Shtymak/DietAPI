import { ApiProperty } from "@nestjs/swagger";

export class StatusDto {
  @ApiProperty({name: "Статус операції", example: "OK"})
  status: string
}