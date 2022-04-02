import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Token, TokenDocument } from "./token.model";
import { Model } from "mongoose";

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>) {
  }

}
