const SHA256 =  require('crypto-js/sha256');
const {DIFFICULTY,MINE_TIME} = require('../config');

class Block {
  constructor(timestamp, lastHash, hash, data,nonce,difficulty) {
    this.timestamp=timestamp;
    this.lastHash=lastHash;
    this.hash=hash;
    this.nonce=nonce;
    this.data=data;
    this.difficulty=difficulty;
  }
  toString(){
    return `Block ----
    timestamp : ${this.timestamp}
    lastHash  : ${this.lastHash.substring(0,10)}
    hash      : ${this.hash.substring(0,10)}
    nonce     : ${this.nonce}
    difficulty: ${this.difficulty}
    data      : ${this.data}
    `;
  }
  static genesis(){
    return new this('Default time','-----','hash1607073',[],0,DIFFICULTY);
  }
  static mineBlock(lastBlock,data){
    let hash,timestamp;
    const lastHash  = lastBlock.hash;
    let {difficulty} =lastHash;
    let nonce=0;
    do{
      nonce++;
      timestamp=Date.now();
      difficulty=Block.adjustDifficulty(lastBlock,timestamp);
      hash=Block.hash(timestamp,lastHash,data,nonce,difficulty);
    }while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));

   return new this(timestamp,lastHash,hash,data,nonce,difficulty);
  }
  static hash(timestamp,lastHash,data,nonce,difficulty){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }
  static blockHash(block){
    const {timestamp,lastHash,data,nonce,difficulty} = block;
    return Block.hash(timestamp,lastHash,data,nonce,difficulty);
  }

  static adjustDifficulty(lastBlock,currentTime){
    let {difficulty} = lastBlock;
    return lastBlock.timestamp+MINE_TIME>currentTime?difficulty+1:difficulty-1;
  }
}

module.exports = Block;
