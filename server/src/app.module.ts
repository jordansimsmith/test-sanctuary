import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import Joi from 'joi';
import { InstitutionsModule } from './institutions/institutions.module';
import { QuestionsModule } from './questions/questions.module';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { AttemptsModule } from './attempts/attempts.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    InstitutionsModule,
    TestsModule,
    QuestionsModule,
    AuthModule,
    AttemptsModule,
    AnswersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),

        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_KEY: Joi.string().required(),
        AWS_S3_ENDPOINT: Joi.string().optional(),
        AWS_S3_BUCKET: Joi.string().required(),

        AUTH0_ISSUER_URL: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      fieldResolverEnhancers: ['guards'],
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, '**', 'migrations', '*.{ts,js}')],
        migrationsRun: true,
      }),
    }),
  ],
})
export class AppModule {}
