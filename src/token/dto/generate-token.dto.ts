import mongoose from "mongoose";

export class GenerateTokenDto{
  email: string;
  name: string;
  role: string;
  id: string
}