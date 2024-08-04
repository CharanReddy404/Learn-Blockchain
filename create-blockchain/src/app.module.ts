import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainService } from './blockchain/blockchain.service';
import { BlockchainController } from './blockchain/blockchain.controller';

@Module({
  imports: [],
  controllers: [AppController, BlockchainController],
  providers: [AppService, BlockchainService],
})
export class AppModule {}
