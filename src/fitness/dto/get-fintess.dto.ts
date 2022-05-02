import { ApiProperty } from '@nestjs/swagger';

export class GetFitnessDto {
    @ApiProperty({
        example: 'Тренування для всього тіла',
        description: 'Назва тренування',
    })
    name: string;
    @ApiProperty({ example: 'me.com', description: 'Посилання на відео' })
    video: string;
    id: string;
    @ApiProperty({ example: [], description: 'Ідентифікатори вправ' })
    exercises: [];
    constructor(model) {
        this.name = model.name;
        this.video = model.video;
        this.exercises = model.exercises;
    }
}
