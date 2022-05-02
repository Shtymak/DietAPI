import { ApiProperty } from '@nestjs/swagger';

export class IOFintessDto {
    @ApiProperty({
        example: 'к983479а90і0а0fwed',
        description: 'Ідентифікатор тренування',
    })
    fitnessId: string;
}
