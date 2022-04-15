import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "../ingredients.model";

export class IngredientDto {
  @ApiProperty({example: "Боби", description: "Назва інгредієнту"})
  name: string

  constructor(ingredient: Ingredient) {
    this.name = ingredient.name
  }
}