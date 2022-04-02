import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.model";
import {Model} from 'mongoose'
import { TokenService } from "../token/token.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
              private tokenService: TokenService,
              private jwtService: JwtService) {
  }

  async registration(){

  }

}
