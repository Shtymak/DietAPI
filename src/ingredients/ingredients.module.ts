import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Ingredient, IngredientSchema } from "./ingredients.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports: [
    MongooseModule.forFeature([{name: Ingredient.name, schema: IngredientSchema}]),
    JwtModule.register(
      { secret: process.env.SECRET_KEY || "SECRET", signOptions: { expiresIn: "7d" } }
    )
  ]
})
export class IngredientsModule {}
