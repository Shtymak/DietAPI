import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
    @ApiProperty({ example: 'Біг', description: 'Назва вправи' })
    @Prop({ unique: true, required: true })
    name: string;
    @ApiProperty({ example: 7200, description: 'Протяжність вправи' })
    @Prop({ required: true })
    length: number;
    @ApiProperty({ example: 'File', description: 'Фото' })
    @Prop({ required: true })
    image: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
