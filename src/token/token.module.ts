import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./token.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [TokenService],
  imports:[MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}]),
    JwtModule.register(
      { secret: process.env.SECRET_KEY || "SECRET", signOptions: { expiresIn: "7d" } }
    )],
  exports: [TokenService]
})
export class TokenModule {}
