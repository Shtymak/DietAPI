import { ApiProperty } from "@nestjs/swagger";

export class UpdateDietDto {
  @ApiProperty({example: "Тиха весна", description:"Назва дієти"})
  name: string
  @ApiProperty({example: "622b5d0938de614a7bff8766", description:"Унікальний ідентифікатор дієти"})
  id: string
}