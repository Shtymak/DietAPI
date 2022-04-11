import { Body, Controller, HttpException, Post, Put, Req, UseGuards } from "@nestjs/common";
import { DietsService } from "./diets.service";
import { CreateDietDto } from "./dto/create-diet.dto";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GetDietDto } from "./dto/get-diet-dto";
import { UpdateDietDto } from "./dto/update-diet.dto";
import { DietExeptionDto } from "./dto/exeption.dto";
import { Roles } from "../token/roles-auth.decorator";
import { RolesGuard } from "../token/roles.guard";
import { AddRecipeDto } from "./dto/add-recipe.dto";
import { GetAddRecipeDto } from "./dto/get-add-recipe-dto";

@Controller("api/diet")
export class DietsController {
  constructor(private readonly dietsService: DietsService) {
  }

  @Post("/")
  @ApiOperation({
    summary: "Створення дієти"
  })
  @ApiResponse({
    status: 200, type: GetDietDto
  })
  @ApiBearerAuth('Jwt-token')
  @ApiHeader({name: "Bearer token", required: true})
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
    status: 200, type: GetDietDto
  })
  @ApiResponse({
    status: 403,type:DietExeptionDto,  description:"Відмовлено в доступі"
  })
  @ApiResponse({
    status: 404,type:DietExeptionDto, description:"Дієту не знайдено"
  })
  @ApiBearerAuth('Jwt-token')
  @ApiHeader({name: "Bearer token", required: true})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async update(@Body() body: UpdateDietDto) {
    try {
      const { id, name } = body;
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return next(
      //     ApiError.BadRequest('Помилка валідації', errors.array())
      //   );
      // }
      const result = await this.dietsService.update(id, name);
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }

  }
  @Post('/add')
  @ApiOperation({
    summary: "Додавання рецепту до дієти"
  })
  @ApiResponse({
    status: 200, type: GetAddRecipeDto
  })
  @ApiResponse({
    status: 403,type:DietExeptionDto,  description:"Відмовлено в доступі"
  })
  @ApiResponse({
    status: 404,type:DietExeptionDto, description:"Дієту не знайдено"
  })
  @ApiBearerAuth('Jwt-token')
  @ApiHeader({name: "Bearer token", required: true})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async addRecipe(@Body() body: AddRecipeDto) {
    try {
      const { recipeId, dietId } = body;
      const result = await this.dietsService.addRecipe(dietId, recipeId);
      return result
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

}
