
const express = require('express');
const app = express();
const userRouter = require('./api/routes/users');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/api/users",userRouter);
app.use((req, res)=>{
    res.json({
        error:{
            messege:"Not found !"
        }
    })
});

module.exports = app;