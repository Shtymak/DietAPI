import { Controller } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiTags } from "@nestjs/swagger";

@Controller('exercise')
@ApiTags('Вправи')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}
}
