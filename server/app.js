const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


const mongoConnect = require('./db/connect');
const userRouters = require('./routers/userRouters')


app.use(express.static('../client'));

mongoConnect();

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(userRouters);


app.listen(process.env.PORT, () =>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})