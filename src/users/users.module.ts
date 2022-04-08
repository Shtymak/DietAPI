import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.model";
import { TokenModule } from "../token/token.module";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
import { FavoriteDiets, FavoriteDietsSchema } from "../models/FavoriteDiets";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: FavoriteDiets.name, schema: FavoriteDietsSchema}]),
    TokenModule,
    JwtModule.register(
      { secret: process.env.SECRET_KEY, signOptions: { expiresIn: "7d" } }
    ),
    MailModule
  ]
})
export class UsersModule {
}
