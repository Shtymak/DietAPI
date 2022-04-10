import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { GetTokenDto } from "../token/dto/get-token.dto";
import { User } from "./users.model";
import {Response, Request} from "express";
import { UserLogoutDto } from "./dto/user-logout.dto";
import { UserAuthGuard } from "./user-auth.guard";
const { Types } = require('mongoose');


@Controller("api/user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({
    summary: "Створення облікового запису користувача"
  })
  @ApiResponse({
    status: 200, type: GetTokenDto
  })
  @Post("registration")
  async registration(@Body() user: CreateUserDto) {
    return this.usersService.registration(user);
  }

  @ApiOperation({
    summary: "Вхід в обліковий запис"
  })
  @ApiResponse({
    status: 200, type: GetTokenDto
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
    status: 200, type: UserLogoutDto
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


  @Get("/all")
  @ApiOperation({
    summary: "Список всіх користувачів"
  })
  @ApiResponse({
    status: 200, type: [User]
  })
  @ApiBearerAuth('Jwt-token')
  @ApiHeader({name: "Bearer token", required: true})
  @UseGuards(UserAuthGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary: "Отримання даних про користувача"
  })
  @ApiResponse({
    status: 200, type: GetTokenDto
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