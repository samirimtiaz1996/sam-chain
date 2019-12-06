const express =  require('express');
const bodyParser = require('body-parser');
const BlockChain = require('../blockchain');

const HTTP_PORT =process.env.HTTP_PORT || 3001;

const app= express();
const blockChain= new BlockChain();

app.use(bodyParser.json());

app.get('/blocks',(req,res)=> {
    res.json(blockChain.chain);
});

app.post('/mine',(req,res)=>{
    const block = blockChain.addBlock(req.body.data);
    console.log(`New Block Added: ${block.toString()}`);

    res.redirect('/blocks');
})

app.listen(HTTP_PORT,()=> console.log(`listening on port ${HTTP_PORT}`));