import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursorTrackingGateway } from './gateways/cursor-tracking.gateway';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/database.config';

@Module({
  imports: [
    CommentModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
      ],
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CursorTrackingGateway],
})
export class AppModule {}
