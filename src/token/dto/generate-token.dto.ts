import mongoose from "mongoose";
import { UserDocument } from "../../users/users.model";

export class GenerateTokenDto{
  email: string;
  name: string;
  role: string;
  id: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  gender: string;
  isActivated: boolean;
  activationLink: string;
}