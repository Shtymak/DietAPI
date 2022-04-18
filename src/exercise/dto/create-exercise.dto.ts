import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseDto {
    @ApiProperty({example: "Біг", description: "Назва вправи"})
    readonly name: string;
    @ApiProperty({example: 7200, description: "Протяжність вправи"})
    readonly length: number;
}