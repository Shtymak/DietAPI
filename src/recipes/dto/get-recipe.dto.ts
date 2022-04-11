import { ApiProperty } from "@nestjs/swagger";

export class GetRecipeDto {
  @ApiProperty({example: "622b5d0938de614a7bff8766", description:"Унікальний ідентифікатор рецепту"})
  id: string
  @ApiProperty({example: "Суп Джи", description:"Назва рецепту"})
  name: string

  @ApiProperty({example: "Lorem ipsum", description:"Опис рецепту"})
  description: string

  @ApiProperty({example: "File.jpeg", description:"Фото"})
  image: string

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.description = model.description;
    this.image = model.image;
  }
}