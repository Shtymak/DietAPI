import { ApiProperty } from '@nestjs/swagger';

export class CreateFitnessDto {
    @ApiProperty({
        example: 'Тренування для всього тіла',
        description: 'Назва тренування',
    })
    name: string;
    @ApiProperty({ example: 'me.com', description: 'Посилання на відео' })
    video: string;
}
