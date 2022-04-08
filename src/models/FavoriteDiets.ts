import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { User } from "../users/users.model";
export type FavoriteDietsDocument = FavoriteDiets & Document;

@Schema()
export class FavoriteDiets {
  @ApiProperty({example: "6228a3b1938d059041203c3b", description:"Ідентифікатор користувача"})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
  @ApiProperty({example: mongoose.Schema.Types.Array, description:"Список дієт"})
  @Prop({type: mongoose.Schema.Types.Array, default: []})
  diets: mongoose.Schema.Types.Array
}

export const FavoriteDietsSchema = SchemaFactory.createForClass(FavoriteDiets);
