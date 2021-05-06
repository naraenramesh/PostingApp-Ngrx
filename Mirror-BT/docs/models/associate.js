const mongoose=require('mongoose')
const unique_validator=require('mongoose-unique-validator');
const associateschema=mongoose.Schema({
    empname:{type:String, required:true},
    empcogemailid:{type:String,required:true,unique:true},
    empBTemailid:{type:String,required:true,unique:true},
    empcontactno:{type:String,required:true},
    empUIN:{type:String,required:true,unique:true},
    empTeams:{type:[String]},
})

associateschema.plugin(unique_validator);

module.exports=mongoose.model('AssociateModel',associateschema)
