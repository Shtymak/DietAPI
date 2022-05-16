import {
    FavoriteFitnesses,
    FavoriteFitnessesDocument,
} from './../models/FavoriteFitnesses';
import { Exercise, ExerciseDocument } from './../exercise/exercise.model';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { GetFitnessDto } from './dto/get-fintess.dto';
import { CreateFitnessDto } from './dto/creare-fitness.dto';
import { Model } from 'mongoose';
import { Fitness, FitnessDocument } from './fitness.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FitnessService {
    constructor(
        @InjectModel(Fitness.name)
        private readonly fitnessModel: Model<FitnessDocument>,
        @InjectModel(Exercise.name)
        private readonly exerciseModel: Model<ExerciseDocument>,
        @InjectModel(FavoriteFitnesses.name)
        private readonly favoriteFintnessModel: Model<FavoriteFitnessesDocument>
    ) {}

    async create(fitnessDto: CreateFitnessDto): Promise<GetFitnessDto> {
        const fitness = await this.fitnessModel.create({
            name: fitnessDto.name,
            video: fitnessDto.video,
            exercises: [],
        });
        return new GetFitnessDto(fitness);
    }

    async getOne(id: string): Promise<GetFitnessDto> {
        const fitness = await this.fitnessModel.findById(id);
        return new GetFitnessDto(fitness);
    }
    async addExercise(id: string, exerciseId: string) {
        try {
            const fitness = await this.fitnessModel.findById(id);
            if (!fitness) {
                throw new BadRequestException('Тренування не знайдено');
            }
            const exercise = await this.exerciseModel.findById(exerciseId);
            if (!exercise) {
                throw new BadRequestException('Вправа не знайдена');
            }
            const result = await this.fitnessModel.findByIdAndUpdate(
                { _id: fitness._id },
                { $addToSet: { exercises: new Types.ObjectId(exerciseId) } }
            );
            return result;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async findAll(): Promise<GetFitnessDto[]> {
        const fitness = await this.fitnessModel.find();
        return fitness.map((x) => new GetFitnessDto(x));
    }

    async addToFavorite(id: string, fitnessId: string) {
        try {
            const fitness = await this.fitnessModel.findById(id);
            if (!fitness) {
                throw new BadRequestException('Тренування не знайдено');
            }
            const result = this.favoriteFintnessModel.updateOne(
                {
                    userId: id,
                },
                { $addToSet: new Types.ObjectId(fitnessId) }
            );
            return result;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    async removeFromFavorite(id: string, fitnessId: string) {
        try {
            const fitness = await this.fitnessModel.findById(id);
            if (!fitness) {
                throw new BadRequestException('Тренування не знайдено');
            }
            const result = this.favoriteFintnessModel.updateOne(
                {
                    userId: id,
                },
                { $pull: new Types.ObjectId(fitnessId) }
            );
            return result;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
