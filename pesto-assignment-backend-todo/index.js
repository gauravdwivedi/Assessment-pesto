const express = require('express');
const cors = require('cors');


const port = 8000;

const db = require('./config/mongoose');

const app = express();

app.use(express.json());


app.use(cors());

app.use('/', require('./routes'));

app.listen(port,(err)=>{
    if(err) { console.log('error'); return; }
    console.log( `server is running on ${port}`);
});