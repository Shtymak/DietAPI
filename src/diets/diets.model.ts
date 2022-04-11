import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
export type DietDocument = Diet & Document;

@Schema()
export class Diet {
  @ApiProperty({example: "Тиха весна", description:"Назва дієти"})
  @Prop({ unique: true, required: true })
  name: string;
  @ApiProperty({example: "File", description:"Фото"})
  @Prop({required: true})
  image: string

  @ApiProperty({example: "[ObjectId('fwefjhpo5sdop123odjco32ioidwe')]", description:"Рецепти, які належать до дієти"})
  @Prop({required: true})
  recipes: [mongoose.Schema.Types.ObjectId]

}

export const DietSchema = SchemaFactory.createForClass(Diet);