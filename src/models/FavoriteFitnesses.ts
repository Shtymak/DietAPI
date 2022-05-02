import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { User } from '../users/users.model';
export type FavoriteFitnessesDocument = FavoriteFitnesses & Document;

@Schema()
export class FavoriteFitnesses {
    @ApiProperty({
        example: '6228a3b1938d059041203c3b',
        description: 'Ідентифікатор користувача',
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
    @ApiProperty({
        example: mongoose.Schema.Types.Array,
        description: 'Список тренувань',
    })
    @Prop({ type: mongoose.Schema.Types.Array, default: [] })
    fitnesses: mongoose.Schema.Types.Array;
}

export const FavoriteFitnessesSchema =
    SchemaFactory.createForClass(FavoriteFitnesses);
