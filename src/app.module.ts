import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: ['./dist/entity/**/*.js'],
      migrations: ['./dist/migration/**/*.js'],
      synchronize: false,
      migrationsRun: true,
      logging: true,
      logger: 'file',
      cli: {
        entitiesDir: './dist/entity',
        migrationsDir: './dist/migration',
      },
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
