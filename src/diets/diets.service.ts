import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Diet, DietDocument } from "./diets.model";
import { Model, Types } from "mongoose";
import { GetDietDto } from "./dto/get-diet-dto";
import { AddRecipeDto } from "./dto/add-recipe.dto";
import { GetAddRecipeDto } from "./dto/get-add-recipe-dto";
import { Recipe, RecipeDocument } from "../recipes/recipe.model";
import { GetRecipeDto } from "../recipes/dto/get-recipe.dto";
import { FavoriteDiets, FavoriteDietsDocument } from "../models/FavoriteDiets";
const fileType = '.jpg';
const path = require('path');
const uuid = require('uuid')

function isValidDietAndRecipeIds(dietId, recepieId = null) {
  if (!Types.ObjectId.isValid(dietId)) {
    return false;
  }
  if (!Types.ObjectId.isValid(recepieId) && recepieId) {
    return false;
  }
  return true;
}

@Injectable()
export class DietsService {
  constructor(@InjectModel(Diet.name) private readonly dietModel: Model<DietDocument>,
              @InjectModel(Recipe.name) private readonly recipeModel: Model<RecipeDocument>,
              @InjectModel(FavoriteDiets.name) private readonly favoriteDietsModel: Model<FavoriteDietsDocument>) {
  }

  async create(name, image) : Promise<GetDietDto> {
    const fileName = uuid.v4() + fileType;
    image
      .mv(path.resolve(__dirname, '..', 'static', 'diet', fileName))
      .then((r) => console.log(r));
    const diet = await this.dietModel.create({
      name,
      image: fileName,
    });
    return new GetDietDto(diet);
  }
  async update(id: string, name: string, description: string) : Promise<GetDietDto>  {
    const diet = await this.dietModel.findById(id)
    if(!diet){
      throw new NotFoundException('Дієту не знайдено')
    }
    const result = await this.dietModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          description: description
        },
      }
    );
    return new GetDietDto(result)
  }
  async addRecipe(dietId, recepieId) {
    if (!isValidDietAndRecipeIds(dietId, recepieId)) {
      throw new HttpException("Дані не коректні", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const diet = await this.dietModel.findById(dietId)
    const recipe = await this.recipeModel.findById(recepieId)
    console.log(recipe);
    
    
    if(!diet){
      throw new NotFoundException('Дієту не знайдено')
    }
    if(!recipe){
      throw new NotFoundException('Рецепт не знайдено')
    }
    const result = await this.dietModel.updateOne(
      { _id: dietId },
      {
        $addToSet: {
          recipes: new Types.ObjectId(recepieId),
        },
      }
    );
    return new GetAddRecipeDto(result);
  }
  async removeRecipe(dietId, recipeId) {
    if (!isValidDietAndRecipeIds(dietId, recipeId)) {
      throw new HttpException('Некоректний id параметр', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const result = await this.dietModel.deleteOne(
      { _id: dietId },
      {
        $pull: {
          recipes: new Types.ObjectId(recipeId),
        },
      }
    );
    return new GetAddRecipeDto(result);
  }
  async getRecipes(id:string) {
    const diet = await this.dietModel.findById(id);
    if (!diet) {
      throw new NotFoundException('Дієту не знайдено')
    }
    const recipes = await this.recipeModel.find({
      _id: {
        $in:
          diet.recipes
      },
    });
    const recipesDto = recipes.map((recipe) => new GetRecipeDto(recipe));
    return recipesDto;
  }

  async getDiet(id: string) {
    const diet = await this.dietModel.findById(id);
    if (!diet) {
      throw new NotFoundException('Дієту не знайдено')
    }
    return new GetDietDto(diet);
  }

  async addToFavorite(dietId, id) {
    if (!Types.ObjectId.isValid(dietId)) {
      throw new NotFoundException('Дієту не знайдено')
    }
    const diet = await this.dietModel.findById(dietId);
    if (!diet) {
      throw new NotFoundException('Дієту не знайдено')
    }
    const result = await this.favoriteDietsModel.updateOne(
      {
        user: id,
      },
      {
        $addToSet: {
          diets: new Types.ObjectId(dietId),
        },
      }
    );
    return result;
  }
async getAll(){
  const diets = await this.dietModel.find();
  const dietsDto = diets.map((diet) => new GetDietDto(diet));
  return dietsDto;
}

  async removeFromFavorite(dietId, id) {
    if (!Types.ObjectId.isValid(dietId)) {
      throw new NotFoundException('Дієту не знайдено')
    }
    const diet = await this.dietModel.findById(dietId);
    if (!diet) {
      throw new NotFoundException('Дієту не знайдено')
    }
    const result = await this.favoriteDietsModel.updateOne(
      {
        user: id,
      },
      {
        $pull: {
          diets: new Types.ObjectId(dietId),
        },
      }
    );
    return result;
  }

  async getFavorites(id) {
    const favorites = await this.favoriteDietsModel.findOne({ user: id });
    if (!favorites) {
      throw new NotFoundException('Помилка! Цей користувач не обирав улюблені дієти');
    }
    const favoriteObjects = await this.dietModel.find({
      _id:
        {$in: favorites.diets}
    })
    return favoriteObjects.map(x=>new GetDietDto(x));
  }

}
