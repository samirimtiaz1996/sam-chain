const BlockChain =  require('./index');
const Block     = require('./block');

describe('BlockChain',()=>{
    let blockChain,blockChain2 ;
    beforeEach(()=>{
        blockChain = new BlockChain();
        blockChain2 = new BlockChain();
    });

    it('starts with new genesis block',()=>{
        expect(blockChain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block',()=>{
        const data='chainTest';
        blockChain.addBlock(data);
        expect(blockChain.chain[blockChain.chain.length-1].data).toEqual(data);
    });
    it('validates a valid chain',()=>{
        blockChain2.addBlock('foo');
        expect(blockChain.isValidChain(blockChain2.chain)).toBe(true);
    
    });

    it('invalidates a chain with corrupt genesis block',()=>{
        blockChain2.chain[0].data="Corrupt data";
        expect(blockChain.isValidChain(blockChain2.chain)).toBe(false);

    });

    it('invalidates a chain with corrupt block',()=>{
        blockChain2.addBlock('test_data');
        blockChain2.chain[1].data='modified data(corrupted)';
        expect(blockChain.isValidChain(blockChain2.chain)).toBe(false);

    });

    it('Replaces the chain with valid chain',()=>{
        blockChain2.addBlock('foo');
        blockChain.replaceChain(blockChain2.chain);

        expect(blockChain.chain).toEqual(blockChain2.chain);
    });

    it('chain can not be replaces as it is not longer than current chain',()=>{
        expect(blockChain.replaceChain(blockChain2)).toBe(false);
    });
});