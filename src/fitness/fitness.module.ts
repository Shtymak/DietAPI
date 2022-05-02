import { Exercise } from './../exercise/exercise.model';
import { Module } from '@nestjs/common';
import { FitnessService } from './fitness.service';
import { FitnessController } from './fitness.controller';
import { Fitness, FitnessSchema } from './fitness.model';
import { ExerciseSchema } from 'src/exercise/exercise.model';
import {
    FavoriteFitnesses,
    FavoriteFitnessesSchema,
} from 'src/models/FavoriteFitnesses';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [FitnessController],
    providers: [FitnessService],
    imports: [
        MongooseModule.forFeature([
            { name: Fitness.name, schema: FitnessSchema },
            { name: Exercise.name, schema: ExerciseSchema },
            { name: FavoriteFitnesses.name, schema: FavoriteFitnessesSchema },
        ]),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'SECRET',
            signOptions: { expiresIn: '7d' },
        }),
    ],
})
export class FitnessModule {}
