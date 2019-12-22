const Block = require('./blockchain/block');
const BlockChain = require('./blockchain');

const fooBlock = Block.mineBlock(Block.genesis(),'foo')
console.log(fooBlock.toString());

const blockChain=new BlockChain();

for(let i=0;i<10;i++){
    console.log(blockChain.addBlock(`foo ${i}`).toString());
}
