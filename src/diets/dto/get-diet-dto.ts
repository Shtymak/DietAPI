import { ApiProperty } from "@nestjs/swagger";
import { Diet } from "../diets.model";
import mongoose from "mongoose";

export class GetDietDto {
  @ApiProperty({example: "Тиха весна", description:"Назва дієти"})
  name: string
  @ApiProperty({example: "File.jpeg", description:"Фото"})
  image: string
  @ApiProperty({example: "[ObjectId('fwefjhpo5sdop123odjco32ioidwe')]", description:"Рецепти, які належать до дієти"})
  recipes: [mongoose.Schema.Types.ObjectId]
  constructor(diet: Diet) {
    this.name = diet.name
    this.recipes = diet.recipes
    this.image = diet.image
  }
}
