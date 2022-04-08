import { ApiProperty } from "@nestjs/swagger";
import { DeleteTokenDto } from "./token-delete.dto";

export class UserLogoutDto {
  @ApiProperty({ example: "Успішний вихід", description: "Відповідь сервера" })
  message: string;
  @ApiProperty({ description: "Відповідь БД" })
  token: DeleteTokenDto
}

