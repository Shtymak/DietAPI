import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.model";
import { Model, Types } from "mongoose";
import { TokenService } from "../token/token.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { MailService } from "../mail/mail.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { FavoriteDiets, FavoriteDietsDocument } from "../models/FavoriteDiets";
import * as mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
              @InjectModel(FavoriteDiets.name) private readonly favoriteDietsModel: Model<FavoriteDietsDocument>,
              private tokenService: TokenService,
              private mailService: MailService) {
  }

  async getTokens(user: UserDocument) {
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
    };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userModel.findOne({ email: userDto.email });
    if (candidate) {
      throw new HttpException(`Користувач з логіном ${userDto.email} існує!`, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 9);
    const activationLink = uuid.v4();
    const name = userDto.name || `User${uuid.v4().split("-").shift()}`;
    const { email } = userDto;
    const user = await this.userModel.create({
      email,
      password: hashPassword,
      activationLink,
      name
    });
    await this.favoriteDietsModel.create({ user: user._id });
    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    return this.getTokens(user);
  }

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw new HttpException("Некоректне посилання активації", HttpStatus.NOT_FOUND);
    }
    user.isActivated = true;
    await user.save();
  }

  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new HttpException("Такого користувача неіснує", HttpStatus.NOT_FOUND);
    }
    const isPasswordsEquals = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordsEquals) {
      throw new HttpException("Хибний пароль", HttpStatus.BAD_REQUEST);
    }
    return this.getTokens(user);
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException("Ви не авторизовані", HttpStatus.UNAUTHORIZED);
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDataBase = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDataBase) {
      throw new HttpException("Ви не авторизовані", HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userModel.findById(userData.id);
    return this.getTokens(user);
  }
  async getOne(id: string){
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Неправильний ідентифікатор", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('Користувача не існує', HttpStatus.NOT_FOUND);
    }
    return this.getTokens(user)
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    const count = users.reduce((total) => total + 1, 0);
    return { users, count };
  }

}
