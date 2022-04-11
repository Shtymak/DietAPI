import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @ApiProperty({example: "Cуп Джи", description:"Назва реуепту"})
  @Prop({ unique: true, required: true })
  name: string;

  @ApiProperty({example: "Lorem ipsum", description:"Опис реуепту"})
  @Prop( )
  description: string;

  @ApiProperty({example: "File", description:"Фото"})
  @Prop({required: true})
  image: string

  @ApiProperty({example: "[ObjectId('fwefjhpo5sdop123odjco32ioidwe')]", description:"Інгредієнти, які належать до рецепту"})
  @Prop({required: true})
  ingredients: [mongoose.Schema.Types.ObjectId]

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);