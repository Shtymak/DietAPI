import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
export type FitnessDocument = Fitness & Document;

@Schema()
export class Fitness {
  @ApiProperty({example: "Тренування для всього тіла", description:"Назва тренування"})
  @Prop({ unique: true, required: true })
  name: string;
  @ApiProperty({example: "[ObjectId('fwefjhpo5sdop123odjco32ioidwe')]", description:"Ідентифікатори тренувань"})
  @Prop()
  exercises:[mongoose.Schema.Types.ObjectId]
  @ApiProperty({example: "video.mp4", description:"Відео"})
  @Prop({required: true})
  video: string
}

export const FitnessSchema = SchemaFactory.createForClass(Fitness);