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
import { RecipesService } from "./recipes.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../token/roles-auth.decorator";
import { RolesGuard } from "../token/roles.guard";
import { GetRecipeDto } from "./dto/get-recipe.dto";
import { DietExeptionDto } from "../diets/dto/exeption.dto";
import { JwtAuthGuard } from "../token/auth.guard";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { InputIngredientDto } from "./dto/input-ingredient.dto";
import { StatusDto } from "../diets/dto/status.dto";

const path = require("path");
const uuid = require("uuid");
const fileType = ".jpg";

@Controller("api/recipes")
@ApiTags("Рецепти")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {
  }

  @Post("/")
  @ApiOperation({
    summary: "Додати новий рецепт"
  })
  @ApiResponse({
    status: HttpStatus.CREATED, type: GetRecipeDto
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async create(@Body() body: CreateRecipeDto, @Req() req) {
    try {
      const { image } = req.files;
      const fileName = uuid.v4() + fileType;
      image.mv(path.resolve(__dirname, "..", "static", "recipe", fileName))
        .then((r) => console.log(r));
      const recipe = await this.recipesService.create(body, fileName);
      return recipe;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Отримати дані про рецепт"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetRecipeDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @UseGuards(JwtAuthGuard)
  async getOne(@Param("id") id: string) {
    try {
      const recipe = this.recipesService.getOne(id);
      return recipe;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Put("/")
  @ApiOperation({
    summary: "Оновити назву рецепту"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetRecipeDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Рецепту з таким ідентифікатору немає"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async update(@Body() body: UpdateRecipeDto) {
    try {
      const recipe = await this.recipesService.update(body);
      return recipe;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post("/ingredients/add")
  @ApiOperation({
    summary: "Оновити назву рецепту"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetRecipeDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Рецепту з таким ідентифікатору немає"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async addIngredient(@Body() body: InputIngredientDto) {
    try {
      const result = await this.recipesService.addIngredient(body);
      return result.modifiedCount > 0 ? { status: "OK" } : { status: "FAIL" };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete("/ingredients/remove")
  @ApiOperation({
    summary: "Оновити назву рецепту"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetRecipeDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: DietExeptionDto, description: "Рецепту з таким ідентифікатору немає"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async removeIngredient(@Body() body: InputIngredientDto) {
    try {
      const result = await this.recipesService.removeIngredient(body);
      return result.modifiedCount > 0 ? { status: "OK" } : { status: "FAIL" };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
