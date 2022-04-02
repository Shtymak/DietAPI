import * as mongoose from "mongoose";
export class GetUserDto {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  role: string;
  id: string
}