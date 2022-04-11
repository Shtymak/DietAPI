import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Diet, DietDocument } from "./diets.model";
import { Model, Types } from "mongoose";
import { GetDietDto } from "./dto/get-diet-dto";
import { AddRecipeDto } from "./dto/add-recipe.dto";
import { GetAddRecipeDto } from "./dto/get-add-recipe-dto";
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
  constructor(@InjectModel(Diet.name) private readonly dietModel: Model<DietDocument>) {
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
  async update(id: string, name: string) : Promise<GetDietDto>  {
    const diet = await this.dietModel.findById(id)
    if(!diet){
      throw new NotFoundException('Дієту не знайдено')
    }
    const result = await this.dietModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
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
    if(!diet){
      throw new NotFoundException('Дієту не знайдено')
    }
    //Todo: add recipe id finder
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

}
