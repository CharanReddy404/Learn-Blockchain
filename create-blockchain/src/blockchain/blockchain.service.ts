import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as crypto from 'crypto';

@Injectable()
export class BlockchainService {
  chain: any[] = [];

  constructor() {
    this.createBlock(1, '0');
  }

  createBlock(proof: number, previousHash: string) {
    const block = {
      index: this.chain.length + 1,
      timestamp: dayjs().toISOString(),
      proof,
      previous_hash: previousHash,
    };
    this.chain.push(block);
    return block;
  }

  getPreviousBlock() {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork(previousProof: number) {
    let newProof = 1;
    let checkProof = false;
    while (!checkProof) {
      const hashOperation = crypto
        .createHash('sha256')
        .update((newProof ** 2 - previousProof ** 2).toString())
        .digest('hex');
      if (hashOperation.substring(0, 4) === '0000') {
        checkProof = true;
      } else {
        newProof += 1;
      }
    }
    return newProof;
  }

  hash(block: any) {
    const blockString = JSON.stringify(block);
    return crypto.createHash('sha256').update(blockString).digest('hex');
  }

  isChainValid(chain: any[]) {
    let previousBlock = chain[0];
    let blockIndex = 1;

    while (blockIndex < chain.length) {
      const block = chain[blockIndex];
      if (block.previous_hash !== this.hash(previousBlock)) {
        return false;
      }
      const previousProof = previousBlock.proof;
      const proof = block.proof;
      const hashOperation = crypto
        .createHash('sha256')
        .update((proof ** 2 - previousProof ** 2).toString())
        .digest('hex');
      if (hashOperation.substring(0, 4) !== '0000') {
        return false;
      }
      previousBlock = block;
      blockIndex += 1;
    }
    return true;
  }

  getChain() {
    return this.chain;
  }
}
