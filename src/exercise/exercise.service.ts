import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from './exercise.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExerciseService {
constructor(@InjectModel(Exercise.name) private readonly exerciseModel: Model<ExerciseDocument>) {}

    async create(exercise: CreateExerciseDto) {
        const createdExercise = await this.exerciseModel.create(exercise);
        return createdExercise;
    }
}
