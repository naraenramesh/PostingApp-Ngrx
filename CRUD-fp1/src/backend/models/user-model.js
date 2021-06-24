const mongoose=require('mongoose');

const userschema=mongoose.Schema({username:{type:String,required:true},
password:{type:String,required:true},
token:{type:String},
expiresIn:{type:Number}})

module.exports=mongoose.model('User',userschema)
