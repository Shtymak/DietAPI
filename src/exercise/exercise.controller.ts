import {
    Body,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiBody,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercise')
@ApiTags('Вправи')
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}
    @Post('/new')
    @ApiOperation({ summary: 'Створити вправу' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiBody({ type: CreateExerciseDto })
    async create(@Body() exercise: CreateExerciseDto) {
        const createdExercise = await this.exerciseService.create(exercise);
        return createdExercise;
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Отримати вправу' })
    @ApiParam({ name: 'id' })
    @ApiResponse({ status: HttpStatus.OK, type: CreateExerciseDto })
    @ApiNotFoundResponse({ description: 'Вправа не знайдена' })
    async get(@Param('id') id: string) {
        try {
            const exercise = await this.exerciseService.get(id);
            return exercise;
        } catch (e) {
            throw new HttpException(e.message, e.status);
        }
    }
}
