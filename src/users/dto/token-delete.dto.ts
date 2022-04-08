import { ApiProperty } from "@nestjs/swagger";

export class DeleteTokenDto{
  @ApiProperty({ example: true, description: "Успішність видалення" })
  acknowledged: boolean;
  @ApiProperty({ example: 1, description: "Кількість видалених елементів" })
  deletedCount: number
}