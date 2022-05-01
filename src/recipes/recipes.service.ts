import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Recipe, RecipeDocument } from "./recipe.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { GetRecipeDto } from "./dto/get-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { InputIngredientDto } from "./dto/input-ingredient.dto";
import { Ingredient, IngredientDocument } from "../ingredients/ingredients.model";

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private readonly recipeModel: Model<RecipeDocument>,
              @InjectModel(Ingredient.name) private readonly ingredientModel: Model<IngredientDocument>) {
  }


  async create(body: CreateRecipeDto, fileName: string): Promise<GetRecipeDto> {
    const { name, description } = body;

    const recipe = await this.recipeModel.create({
      name,
      description,
      image: fileName
    });
    return new GetRecipeDto(recipe);
  }

  async getOne(id: string): Promise<GetRecipeDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Хибний ідентифікатор");
    }
    const recipe = await this.recipeModel.findById(id);
    if (!recipe) {
      throw new NotFoundException("Рецепт не знайдено");
    }
    return new GetRecipeDto(recipe);
  }

  async update(body: UpdateRecipeDto) {
    const { id, name } = body;
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException("Невірний id рецепту", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const result = await this.recipeModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name
        }
      }
    );
    return new GetRecipeDto(result);
  }

  async addIngredient(body: InputIngredientDto) {
    const { ingredientId, recipeId } = body;
    if (!Types.ObjectId.isValid(ingredientId)) {
      throw new BadRequestException(`Хибний ідентифікатор ${ingredientId}`);
    }
    if (!Types.ObjectId.isValid(ingredientId)) {
      throw new BadRequestException(`Хибний ідентифікатор ${recipeId}`);
    }
    const ingredient = await this.ingredientModel.findById(ingredientId);
    if (!ingredient) {
      throw new NotFoundException("Інгредієнт не знайдено");
    }
    console.log(recipeId);
    
    const result = await this.recipeModel.updateOne({
      _id: recipeId
    }, {
      $addToSet: {
        ingredients: new Types.ObjectId(ingredientId)
      }
    });
  
    return result;
  }

  async removeIngredient(body: InputIngredientDto) {
    const { ingredientId, recipeId } = body;
    if (!Types.ObjectId.isValid(ingredientId)) {
      throw new BadRequestException(`Хибний ідентифікатор ${ingredientId}`);
    }
    if (!Types.ObjectId.isValid(ingredientId)) {
      throw new BadRequestException(`Хибний ідентифікатор ${recipeId}`);
    }
    const ingredient = await this.ingredientModel.findById(ingredientId);
    if (!ingredient) {
      throw new NotFoundException("Інгредієнт не знайдено");
    }
    const result = await this.recipeModel.updateOne({
        _id: recipeId
      },
      {
        $pull: {
          ingredients: ingredient
        }
      });
    return result;
  }
}
