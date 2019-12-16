const express =  require('express');
const bodyParser = require('body-parser');
const BlockChain = require('../blockchain');
const P2pServer =require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app= express();
const blockChain= new BlockChain();
const p2pServer= new P2pServer(blockChain);

app.use(bodyParser.json());

app.get('/blocks',(req,res)=> {
    res.json(blockChain.chain);
});

app.post('/mine',(req,res)=>{
    const block = blockChain.addBlock(req.body.data);
    console.log(`New Block Added: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
})

app.listen(HTTP_PORT,()=> console.log(`listening on port ${HTTP_PORT}`));
p2pServer.listen();