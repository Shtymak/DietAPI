import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from './exercise.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExerciseService {
constructor(@InjectModel(Exercise.name) private readonly exerciseModel: Model<ExerciseDocument>) {}

    async create(exercise: CreateExerciseDto) {
        const createdExercise = await this.exerciseModel.create(exercise);
        return createdExercise;
    }

    async get(id: string) {
        const exercise = await this.exerciseModel.findById(id);
        if (!exercise) {
            throw new NotFoundException('Вправа не знайдена');
        }
        return exercise;
    }
}
