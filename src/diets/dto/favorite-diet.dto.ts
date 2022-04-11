import { ApiProperty } from "@nestjs/swagger";

export class FavoriteDietDto {
  @ApiProperty({example: "622b5d0938de614a7bff8766", description:"Унікальний ідентифікатор дієти"})
  dietId: string
}