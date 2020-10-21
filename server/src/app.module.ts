import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Institution } from './institutions/institutions.entity';
import { InstitutionsModule } from './institutions/institutions.module';
import { Test } from './tests/tests.entity';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    InstitutionsModule,
    TestsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'typeormuser',
      password: 'password',
      database: 'test_sanctuary',
      entities: [Institution, Test],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
