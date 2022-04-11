import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({example: 180, description:"Зріст"})
  height: number
  @ApiProperty({example: 80, description:"Вага"})
  weight:number
  @ApiProperty({example: "Male", description:"Стать"})
  gender:string
  @ApiProperty({example: "2022-09-22", description:"Дата народження"})
  dateOfBirth:Date
  @ApiProperty({example: "File", description:"Фото"})
  image: string
}