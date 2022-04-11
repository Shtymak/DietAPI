import { Module } from '@nestjs/common';
import { DietsService } from './diets.service';
import { DietsController } from './diets.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Diet, DietSchema } from "./diets.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [DietsController],
  providers: [DietsService],
  imports:[MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
    JwtModule.register(
      { secret: process.env.SECRET_KEY || "SECRET", signOptions: { expiresIn: "7d" } }
    ),]
})
export class DietsModule {}
