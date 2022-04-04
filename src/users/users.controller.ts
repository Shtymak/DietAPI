import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration')
  async registration(@Body() user: CreateUserDto){
    return this.usersService.registration(user)
  }

  @Post('login')
  async login(@Body() user: LoginUserDto){
    return this.usersService.login(user)
  }

  @Get('/')
  async getAllUsers(){
    return this.usersService.getAllUsers()
  }
}
