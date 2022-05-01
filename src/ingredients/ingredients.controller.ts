import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { IngredientsService } from './ingredients.service';
import { IngredientDto } from "./dto/ingredient.dto";
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../token/roles-auth.decorator";
import { RolesGuard } from "../token/roles.guard";
import { DietExeptionDto } from "../diets/dto/exeption.dto";
@Controller('api/ingredients')
@ApiTags('Інгредієнти')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post('/new')
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   type: IngredientDto
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   type: DietExeptionDto
  // })
  // @ApiBearerAuth("Jwt-token")
  // @ApiHeader({ name: "Bearer token", required: true })
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  async create(@Body() body) {
    try{
      const ingredient = await this.ingredientsService.create(body.name)
      return ingredient;
    }catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}
