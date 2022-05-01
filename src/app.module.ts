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
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { FitnessModule } from './fitness/fitness.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.URL),
        UsersModule,
        TokenModule,
        MailModule,
        DietsModule,
        RecipesModule,
        IngredientsModule,
        FitnessModule,
        ExerciseModule,
        ServeStaticModule.forRootAsync({
            useFactory: () => [
                {
                    rootPath: resolve(__dirname,'static'),
                },
            ],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, MailService],
})
export class AppModule {}
