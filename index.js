const express=require('express')
const cors=require('cors');
const { connection } = require('./connection/db');
const { userRouter } = require('./routes/userRoute');
const oemRouter=require('./routes/oemRoute')
const inventoryRouter = require('./routes/inventoryRoute');


require("dotenv").config();

const app = express()
app.use(cors())
//this express.json is used to get the data from the fronted in json  parsed format
app.use(express.json())

app.get("/",(res,req)=>{
    res.send(`<h1>Hello Dealers</h1>`)
})

app.use("/user",userRouter)
app.use("/oem",oemRouter)
app.use("/inventory",inventoryRouter)
app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection
        console.log("server is connected to mongoDB");
    }catch(err){
        console.log(err);
    }
    console.log(`server in running on the ${process.env.PORT}`);
})