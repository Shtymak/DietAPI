import { Controller } from '@nestjs/common';
import { FitnessService } from './fitness.service';
import { ApiTags } from "@nestjs/swagger";

@Controller('fitness')
@ApiTags('Тренування')
export class FitnessController {
  constructor(private readonly fitnessService: FitnessService) {}
}
