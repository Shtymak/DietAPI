import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./recipe.model";
import { JwtModule } from "@nestjs/jwt";
import { Ingredient, IngredientSchema } from "../ingredients/ingredients.model";

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [MongooseModule.forFeature([{name: Recipe.name, schema:RecipeSchema}, {name: Ingredient.name, schema: IngredientSchema}]),
    JwtModule.register(
      { secret: process.env.SECRET_KEY || "SECRET", signOptions: { expiresIn: "7d" } }
    )]
})
export class RecipesModule {}
