import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipeDto {
  @ApiProperty({example: "Суп Джи", description:"Назва рецепту"})
  name: string

  @ApiProperty({example: "Lorem ipsum", description:"Опис рецепту"})
  description: string

  @ApiProperty({example: "File.jpeg", description:"Фото"})
  image: string
}