import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursorTrackingGateway } from './gateways/cursor-tracking.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CursorTrackingGateway],
})
export class AppModule {}
