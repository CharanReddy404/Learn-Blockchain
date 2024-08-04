import { Controller, Get } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('mine_block')
  mineBlock() {
    const previousBlock = this.blockchainService.getPreviousBlock();
    const previousProof = previousBlock.proof;
    const proof = this.blockchainService.proofOfWork(previousProof);
    const previousHash = this.blockchainService.hash(previousBlock);
    const block = this.blockchainService.createBlock(proof, previousHash);
    return {
      message: 'Congratulations, you just mined the block!',
      block,
    };
  }

  @Get('get_chain')
  getChain() {
    const chain = this.blockchainService.getChain();
    return {
      chain,
      length: chain.length,
    };
  }

  @Get('is_valid')
  isValid() {
    const isValid = this.blockchainService.isChainValid(
      this.blockchainService.getChain(),
    );
    return {
      message: isValid
        ? 'All good, the Blockchain is valid.'
        : 'We have a problem, the Blockchain is not valid.',
    };
  }
}
