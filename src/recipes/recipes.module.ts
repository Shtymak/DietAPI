import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./recipe.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [MongooseModule.forFeature([{name: Recipe.name, schema:RecipeSchema}]),
    JwtModule.register(
      { secret: process.env.SECRET_KEY || "SECRET", signOptions: { expiresIn: "7d" } }
    )]
})
export class RecipesModule {}
