import { UseGuards } from '@nestjs/common';
import { IOExerciseDto } from './dto/exercise.dto';
import { Body, Get, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { FitnessService } from './fitness.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFitnessDto } from './dto/creare-fitness.dto';
import { GetFitnessDto } from './dto/get-fintess.dto';
import { IOFintessDto } from './dto/io-fitness.dto';
import { JwtAuthGuard } from 'src/token/auth.guard';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('api/fitness')
@ApiTags('Тренування')
export class FitnessController {
    constructor(private readonly fitnessService: FitnessService) {}

    @Post('/new')
    @ApiOperation({ summary: 'Cтворити нове тренування' })
    @ApiResponse({ status: HttpStatus.CREATED })
    async create(@Body() fitnessDto: CreateFitnessDto) {
        const fitness = await this.fitnessService.create(fitnessDto);
        return fitness;
    }

    @Get('/all')
    @ApiOperation({ summary: 'Список всіх тренувань' })
    @ApiResponse({ status: HttpStatus.OK, type: [GetFitnessDto] })
    async findAll() {
        const fitness = await this.fitnessService.findAll();
        return fitness;
    }
    @Get('/:id')
    @ApiOperation({ summary: 'Отримати тренування по ідентифікатору' })
    @ApiResponse({ status: HttpStatus.OK, type: GetFitnessDto })
    @ApiParam({ name: 'id', required: true })
    async getOne(@Param('id') id: string) {
        const fitness = await this.fitnessService.getOne(id);
        return fitness;
    }

    @Put('/favorite/add')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Додати тренування до улюблених' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    async addToFavorite(@Body() body: IOFintessDto, @Req() request) {
        const userId = request.user.id;
        const fintessId = body.fitnessId;
        const result = await this.fitnessService.addToFavorite(
            userId,
            fintessId
        );
        return result;
    }
    @Put('/favorite/remove')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Видалити тренування з улюблених' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    async removeFromFavorite(@Body() body: IOFintessDto, @Req() request) {
        const userId = request.user.id;
        const fintessId = body.fitnessId;
        const result = await this.fitnessService.removeFromFavorite(
            userId,
            fintessId
        );
        return result;
    }

    @Put('/add')
    @ApiOperation({ summary: 'Додати тренування' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK })
    async addExercise(@Body() body: IOExerciseDto) {
        const result = await this.fitnessService.addExercise(
            body.id,
            body.exerciseId
        );
        return result;
    }
}
