import { Controller } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiTags } from "@nestjs/swagger";
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercise')
@ApiTags('Вправи')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  async create(exercise: CreateExerciseDto) {
    const createdExercise = await this.exerciseService.create(exercise);
    return createdExercise;
  }
}
