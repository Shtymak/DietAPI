import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.model";
import { TokenModule } from "../token/token.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule,
    JwtModule.register(
      { secret: process.env.SECRET_KEY, signOptions: { expiresIn: "7d" } }
    )
  ]
})
export class UsersModule {
}
