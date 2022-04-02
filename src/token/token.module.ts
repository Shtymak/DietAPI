import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./token.model";

@Module({
  providers: [TokenService],
  imports:[MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}])],
  exports: [TokenService]
})
export class TokenModule {}
