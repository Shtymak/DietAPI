import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { DietsModule } from './diets/diets.module';

@Module({
  imports: [ ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL),
    UsersModule,
    TokenModule,
    MailModule,
    DietsModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
