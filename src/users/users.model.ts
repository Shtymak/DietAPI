import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: "" })
  name: string;
  @Prop({ default: 0.0 })
  height: number;
  @Prop({ default: 0.0 })
  weight: number
  @Prop({default: "Male"})
  gender: string
  @Prop({default: new Date().getDate() })
  dateOfBirth: Date
  @Prop({required: false})
  image: string
  @Prop({default: false})
  isActivated: boolean
  @Prop()
  activationLink:string
  @Prop({default: "USER" })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);

