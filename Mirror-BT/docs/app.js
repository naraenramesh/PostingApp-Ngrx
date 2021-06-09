const express=require('express')
const bodyParser=require('body-parser')
const team_router=require('./router/team_route')
const associate_router=require('./router/associate_route');
const user_router=require('./router/user_route');
const issues_router=require('./router/issues_route');
const oncall_router=require('./router/oncall_route');
const path=require("path");

const mongoose=require('mongoose');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use("/",express.static(path.join(__dirname,"angular")));

mongoose.connect("mongodb+srv://mirror:9GJRW8geA2FAMsdG@cluster0.hkf6m.mongodb.net/MIRROR_PROD?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology : true})
.then(()=>{console.log("Connected to Database")}).catch(()=>{console.log("Connection failed!")})

app.use(( req,res,next)=>
{
    //res.send("This is first middleware");
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")

    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PATCH,PUT,OPTIONS")
    next();
})

app.use("/api/issues",issues_router);
app.use("/api/teams",team_router);
app.use("/api/users",user_router);
app.use("/api/associates",associate_router);
app.use("/api/oncall",oncall_router);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
})

module.exports=app;
