import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Token, TokenDocument } from "./token.model";
import { Model } from "mongoose";
import { User, UserDocument } from "../users/users.model";
import { JwtService } from "@nestjs/jwt";
import { GetUserDto } from "../users/dto/get-user.dto";
import { GenerateTokenDto } from "./dto/generate-token.dto";
import { GetTokenDto } from "./dto/get-token.dto";

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
              private jwtService: JwtService) {
  }

  generateTokens(user: UserDocument): GetTokenDto {
    const payload: GenerateTokenDto = { id: user.id, email: user.email, name: user.name, role: user.role }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload)
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

}
