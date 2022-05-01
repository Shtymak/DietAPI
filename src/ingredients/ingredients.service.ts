import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ingredient, IngredientDocument } from "./ingredients.model";
import { IngredientDto } from "./dto/ingredient.dto";

@Injectable()
export class IngredientsService {
  constructor(@InjectModel(Ingredient.name) private readonly ingredientModel: Model<IngredientDocument>) {
  }

  async create(name: string) {
    const ingredient = await this.ingredientModel.create({name})
    return new IngredientDto(ingredient)
  }

}
