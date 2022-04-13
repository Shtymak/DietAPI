import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
  @ApiProperty({example: "Боби", description:"Інгредієнту"})
  @Prop({ unique: true, required: true })
  name: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);