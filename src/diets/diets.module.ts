import { Module } from '@nestjs/common';
import { DietsService } from './diets.service';
import { DietsController } from './diets.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Diet, DietSchema } from "./diets.model";
import { JwtModule } from "@nestjs/jwt";
import { Recipe, RecipeSchema } from "../recipes/recipe.model";
import { FavoriteDiets, FavoriteDietsSchema } from "../models/FavoriteDiets";

@Module({
  controllers: [DietsController],
  providers: [DietsService],
  imports:[MongooseModule.forFeature([
    { name: Diet.name, schema: DietSchema },
    { name: Recipe.name, schema: RecipeSchema},
    { name: FavoriteDiets.name, schema: FavoriteDietsSchema}
  ]),
    JwtModule.register(
      { secret: process.env.SECRET_KEY || "SECRET", signOptions: { expiresIn: "7d" } }
    ),]
})
export class DietsModule {}
