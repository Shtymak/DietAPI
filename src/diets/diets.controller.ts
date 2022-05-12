import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { DietsService } from "./diets.service";
import { CreateDietDto } from "./dto/create-diet.dto";
import { ApiBearerAuth, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetDietDto } from "./dto/get-diet-dto";
import { UpdateDietDto } from "./dto/update-diet.dto";
import { DietExeptionDto } from "./dto/exeption.dto";
import { Roles } from "../token/roles-auth.decorator";
import { RolesGuard } from "../token/roles.guard";
import { AddRecipeDto } from "./dto/add-recipe.dto";
import { GetAddRecipeDto } from "./dto/get-add-recipe-dto";
import e from "express";
import { GetRecipeDto } from "../recipes/dto/get-recipe.dto";
import { FavoriteDietDto } from "./dto/favorite-diet.dto";
import { JwtAuthGuard } from "../token/auth.guard";
import { StatusDto } from "./dto/status.dto";
import { FavoriteDiets } from "../models/FavoriteDiets";
import { Diet } from "./diets.model";

@Controller("api/diet")
@ApiTags("Дієти")
export class DietsController {
  constructor(private readonly dietsService: DietsService) {
  }

  @Get('/all')
  @ApiOperation({
    summary: "Всі дієти",
  })
  @ApiResponse({
    status: HttpStatus.OK, type: [GetDietDto]
  })
  async getAll(){
    try {
      const diets = await this.dietsService.getAll();
      return diets;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post("/")
  @ApiOperation({
    summary: "Створення дієти"
  })
  @ApiResponse({
    status: HttpStatus.CREATED, type: GetDietDto
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async create(@Body() body: CreateDietDto, @Req() request) {
    try {
      const { name } = body;
      const { image } = request.files;
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return next(
      //     ApiError.BadRequest('Помилка валідації', errors.array())
      //   );
      // }
      const diet = await this.dietsService.create(name, image);
      return diet;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }


  @Put("/")
  @ApiOperation({
    summary: "Оновлення назви дієти"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetDietDto
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відмовлено в доступі"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async update(@Body() body: UpdateDietDto) {
    try {
      const { id, name, description } = body;
      const result = await this.dietsService.update(id, name, description);
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }

  }

  @Post("/add")
  @ApiOperation({
    summary: "Додавання рецепту до дієти"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetDietDto
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відмовлено в доступі"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async addRecipe(@Body() body: AddRecipeDto) {
    try {
      const { recipeId, dietId } = body;
      console.log(recipeId, dietId);
      
      const result = await this.dietsService.addRecipe(dietId, recipeId);
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete("/remove")
  @ApiOperation({
    summary: "Видалення рецепту із дієти"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetDietDto
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відмовлено в доступі"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async removeRecipe(@Body() body: AddRecipeDto) {
    try {
      const { recipeId, dietId } = body;
      const result = await this.dietsService.removeRecipe(dietId, recipeId);
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get("/:id/recipes")
  @ApiOperation({
    summary: "Список всіх рецептів"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: [GetRecipeDto]
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  async getRecipes(@Param('id') id: string) {
    try {
      const recipes = await this.dietsService.getRecipes(id);
      return recipes;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }


  @Post('/favorite/add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @ApiOperation({
    summary: "Додати в улюблені рецепти"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: StatusDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Операція неможлива"
  })
  async addToFavorite(@Body() body: FavoriteDietDto, @Req() req) {
    try {
      const { dietId } = body;
      const { id } = req.user;
      const result = await this.dietsService.addToFavorite(dietId, id);
      return result.modifiedCount > 0 ? {status: 'OK'} : {status: 'EXIST'};
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete('/favorite/remove')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @ApiOperation({
    summary: "Видалити з улюблених рецептів"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: StatusDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Операція неможлива"
  })
  async removeFromFavorites(@Body()body:FavoriteDietDto, @Req() req){
    try {
      const { dietId } = body;
      const { id } = req.user;
      const result = await this.dietsService.removeFromFavorite(dietId, id);
      return result.modifiedCount > 0 ? {status: 'OK'} : {status: 'FAIL'};
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @ApiOperation({
    summary: "Список улюблених дієт"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: StatusDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Дієту не знайдено"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Операція неможлива"
  })
  async getFavorites(@Req() req){
    try {
      const { id } = req.user;
      const favorites = await this.dietsService.getFavorites(id);
      return  favorites;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary:"Отримати дієту по id" })
  @ApiResponse({ status: HttpStatus.OK, type: GetDietDto })
  @ApiNotFoundResponse({ description: "Дієту не знайдено" })
  async getDiet(@Param('id') id: string) {
    try {
      const diet = await this.dietsService.getDiet(id);
      return diet;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
