const mongoose=require('mongoose');
const unique_validator= require('mongoose-unique-validator'); 
const userschema=mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    privilege:{type:String, required:true}
})

userschema.plugin(unique_validator);
module.exports=mongoose.model('UserModel',userschema);