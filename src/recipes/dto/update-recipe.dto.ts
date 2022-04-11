import { ApiProperty } from "@nestjs/swagger";

export class UpdateRecipeDto {
  @ApiProperty({example: "622b5d0938de614a7bff8766", description:"Унікальний ідентифікатор рецепту"})
  id: string
  @ApiProperty({example: "Суп Джи", description:"Назва рецепту"})
  name: string
}