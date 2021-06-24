const express=require('express')
const app=express();
const router=express.Router();
const postrouter=require('./routes/post-routes');
const mongoose =require('mongoose');
const bodyParser=require('body-parser')
const UserRoutes=require('./routes/user-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect('mongodb+srv://node_practice:cAATM9Squ0wrHf3m@cluster0.qodnd.mongodb.net/CRUD1-fp1?retryWrites=true&w=majority').then(rs=>
{
  console.log("DB connected")
}).catch(err=>console.log(err))

app.use((req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")

    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PATCH,PUT,OPTIONS")
next();
})

app.use('/',postrouter);
app.use('/user',UserRoutes);
app.listen(3000)


module.exports=app;
