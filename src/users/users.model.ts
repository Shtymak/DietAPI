import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({example: "user@gmail.com", description:"Електронна пошта"})
  @Prop({ unique: true, required: true })
  email: string;
  @ApiProperty({example: "fwipf123AA", description:"Пароль"})
  @Prop({ required: true })
  password: string;
  @ApiProperty({example: "Ростилав", description:"Імʼя"})
  @Prop({ required: true, default: "" })
  name: string;
  @ApiProperty({example: 180, description:"Зріст"})
  @Prop({ default: 0.0 })
  height: number;
  @ApiProperty({example: 80, description:"Вага"})
  @Prop({ default: 0.0 })
  weight: number
  @ApiProperty({example: "Male", description:"Стать"})
  @Prop({default: "Male"})
  gender: string
  @ApiProperty({example: "2022-09-22", description:"Дата народження"})
  @Prop({default: new Date().getDate() })
  dateOfBirth: Date
  @ApiProperty({example: "File", description:"Фото"})
  @Prop({required: false})
  image: string
  @ApiProperty({example: "dsfh-adbk-fnsdjk", description:"Посилання для активації"})
  @Prop({default: false})
  isActivated: boolean
  @Prop()
  activationLink:string
  @ApiProperty({example: "USER", description:"Роль"})
  @Prop({default: "USER" })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);

