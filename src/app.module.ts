import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL),
    UsersModule,
    TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
