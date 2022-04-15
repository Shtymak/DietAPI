import { ApiProperty } from "@nestjs/swagger";

export class InputIngredientDto {
  @ApiProperty({ example: "622b5d0938de614a7bff8766", description: "Унікальний ідентифікатор інгредієнту" })
  ingredientId: string;
  @ApiProperty({ example: "622b5d0938de614a7bff8766", description: "Унікальний ідентифікатор рецепту" })
  recipeId: string;
}