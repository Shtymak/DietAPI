import { ApiProperty } from '@nestjs/swagger';
export class IOExerciseDto {
    @ApiProperty({
        example: 'asdfqr3qcdsafewdaw',
        description: 'Ідентифікатор тренування',
    })
    id: string;
    @ApiProperty({
        example: 'к983479а90і0а0fwed',
        description: 'Ідентифікатор вправи',
    })
    exerciseId: string;
}
