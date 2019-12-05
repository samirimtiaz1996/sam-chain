const Blockchain =  require('./index');
const Block     = require('./block');

describe('Blockchain',()=>{
    let blockchain,blockchain2 ;
    beforeEach(()=>{
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('starts with new genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block',()=>{
        const data='chainTest';
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });
    it('validates a valid chain',()=>{
        blockchain2.addBlock('foo');
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    
    });

    it('invalidates a chain with corrupt genesis block',()=>{
        blockchain2.chain[0].data="Corrupt data";
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);

    });

    it('invalidates a chain with corrupt block',()=>{
        blockchain2.addBlock('test_data');
        blockchain2.chain[1].data='modified data(corrupted)';
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);

    });

    it('Replaces the chain with valid chain',()=>{
        blockchain2.addBlock('foo');
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).toEqual(blockchain2.chain);
    });

    it('chain can not be replaces as it is not longer than current chain',()=>{
        expect(blockchain.replaceChain(blockchain2)).toBe(false);
    });
});