import { ApiProperty } from "@nestjs/swagger";

export class GetAddRecipeDto {
  @ApiProperty({example: 1, description:"Кількість модифікованих елементів"})
  modifiedCount: number
  @ApiProperty({example: true, description:"Усшість оновлення"})
  acknowledged: boolean

  constructor(response) {
    this.modifiedCount = response.modifiedCount
    this.acknowledged = response.acknowledged
  }
}