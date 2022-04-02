import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.model";
import {Model} from 'mongoose'
import { TokenService } from "../token/token.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { MailService } from "../mail/mail.service";
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
              private tokenService: TokenService,
              private mailService: MailService ) {
  }

  async getTokens(user: UserDocument) {
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: user,
    };
  }

  async registration(userDto: CreateUserDto){
    const candidate = await this.userModel.findOne({email: userDto.email})
    if(candidate){
      throw new HttpException(`Користувач з логіном ${userDto.email} існує!`, HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 9);
    const activationLink = uuid.v4();
    const name = userDto.name || `User${uuid.v4().split('-').shift()}`;
    const {email} = userDto
   const user = await this.userModel.create({
      email,
      password: hashPassword,
      activationLink,
      name,
    });
    //await FavoriteDiets.create({ user: user._id });
    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    return this.getTokens(user);
  }

}
