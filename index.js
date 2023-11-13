const express = require('express');
const app = express();
const PORT = 8000;

app.get('/',(req,res)=>{
    return res.send("<h1>Hello World!!</h1>");
})

app.listen(PORT,(err)=>{
    if(err) {
        console.log("Something went wrong!!"+err);
    }
    console.log(`Congratulations! Server is running on PORT ${PORT}`);
})