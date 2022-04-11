import { ApiProperty } from "@nestjs/swagger";

export class CreateDietDto {
  @ApiProperty({example: "Тиха весна", description:"Назва дієти"})
  name: string
  @ApiProperty({example: "File.jpeg", description:"Фото"})
  image: string
}