import { Body, Controller, Get, HttpException, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../token/roles-auth.decorator";
import { RolesGuard } from "../token/roles.guard";
import { GetRecipeDto } from "./dto/get-recipe.dto";
import { DietExeptionDto } from "../diets/dto/exeption.dto";
import { JwtAuthGuard } from "../token/auth.guard";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { AddIngredientDto } from "./dto/add-ingredient.dto";
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
    status: 200, type: GetRecipeDto
  })
  @ApiResponse({
    status: 403, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: 500, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
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
    status: 200, type: GetRecipeDto
  })
  @ApiResponse({
    status: 400, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: 403, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: 500, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
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
    status: 200, type: GetRecipeDto
  })
  @ApiResponse({
    status: 400, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: 403, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: 404, type: DietExeptionDto, description: "Рецепту з таким ідентифікатору немає"
  })
  @ApiResponse({
    status: 500, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async update(@Body() body: UpdateRecipeDto) {
    try {
      const recipe = await this.recipesService.update(body);
      return recipe
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('/ingrediets/add')
  @ApiResponse({
    status: 200, type: StatusDto
  })
  @ApiResponse({
    status: 400, type: DietExeptionDto, description: "Хибний ідентифікатор"
  })
  @ApiResponse({
    status: 403, type: DietExeptionDto, description: "Відсутній доступ"
  })
  @ApiResponse({
    status: 404, type: DietExeptionDto, description: "Рецепту з таким ідентифікатору немає"
  })
  @ApiResponse({
    status: 500, type: DietExeptionDto, description: "Рецепт з такою назвою вже існує"
  })
  @ApiBearerAuth("Jwt-token")
  @ApiHeader({ name: "Bearer token", required: true })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async addIngredient(@Body() body: AddIngredientDto){
    try{
      const result = await this.recipesService.addIngredient(body)
      return result;
    }catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}