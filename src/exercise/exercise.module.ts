import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { ExerciseSchema } from './exercise.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Exercise', schema: ExerciseSchema },
        ]),
    ],
    controllers: [ExerciseController],
    providers: [ExerciseService],
})
export class ExerciseModule {}
