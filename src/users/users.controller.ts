import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetTokenDto } from "../token/dto/get-token.dto";
import { User } from "./users.model";
import {Response, Request} from "express";
import { UserLogoutDto } from "./dto/user-logout.dto";
import { JwtAuthGuard } from "../token/auth.guard";
import { Roles } from "../token/roles-auth.decorator";
import { RolesGuard } from "../token/roles.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ExeptionDto } from "./dto/exeption-dto";
const fileType = '.jpg';
const path = require('path');
const uuid = require('uuid')

@Controller("api/user")
@ApiTags("Користувачі")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({
    summary: "Створення облікового запису користувача"
  })
  @ApiResponse({
    status: HttpStatus.CREATED, type: GetTokenDto
  })
  @Post("registration")
  async registration(@Body() user: CreateUserDto) {
    return this.usersService.registration(user);
  }

  @ApiOperation({
    summary: "Вхід в обліковий запис"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetTokenDto
  })
  @Post("login")
  async login(@Body() user: LoginUserDto, @Res() response: Response) {
    const userDto = await this.usersService.login(user)
    response.cookie('refreshToken', userDto.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.json(userDto);
  }

  @ApiOperation({
    summary: "Вихід з облікового запису"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: UserLogoutDto
  })
  @Post("logout")
  async logout(@Res() response: Response, @Req() request: Request) {
    try {
      const { refreshToken } = request.cookies
      const token = await this.usersService.logout(refreshToken);
      response.clearCookie('refreshToken');
      if (token.deletedCount > 0)
        response.json({
          message: 'Вихід здійснено успішно',
          token,
        });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Ви не авторизовані', HttpStatus.UNAUTHORIZED);
  }
  @ApiOperation({
    summary: "Активація"
  })
  @Get('/activate/:link')
  async activate(@Res() response: Response, @Param('link') link: string){
    await this.usersService.activate(link)
    response.redirect('https://google.com')
  }
  @ApiOperation({
    summary: "Поновлення доступу"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetTokenDto
  })
  @Get('/refresh')
  async refresh(@Res() response: Response, @Req() request: Request){
    try {
      const { refreshToken } = request.cookies;
      const userData = await this.usersService.refresh(refreshToken);
      response.cookie('refreshToken', userData.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Оновлення даних профілю"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetTokenDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, type: ExeptionDto
  })
async update(@Body() body:UpdateUserDto, @Req()req){
    const {id} = req.user
    const { image } = req.files;
    const fileName = uuid.v4() + fileType;
    image.mv(path.resolve(__dirname, '..', 'static', fileName))
      .then((r) => console.log(r));
    const data = await this.usersService.update(id, body, fileName)
    return data
  }

  @Get("/all")
  @ApiOperation({
    summary: "Список всіх користувачів"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: [User]
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN, description: "Відсутній доступ"
  })
  @ApiBearerAuth('Jwt-token')
  @ApiHeader({name: "Bearer token", required: true})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary: "Отримання даних про користувача"
  })
  @ApiResponse({
    status: HttpStatus.OK, type: GetTokenDto
  })
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.getOne(id)
      return user
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}