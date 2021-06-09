const mongoose=require('mongoose')
const unique_validator=require('mongoose-unique-validator');

const oncallschema=mongoose.Schema({
	  oncallDate:{type:Date, required:true, unique:true},
    oncallPrimary:{type:String, required:true},
    oncallSecondary:{type:String, required:true},
    related_team:{type:String,required:true},
    oncallPrimaryEmail:{type:String, required:true},
    oncallPrimaryContact:{type:String, required:true},
    oncallSecondaryEmail:{type:String, required:true},
    oncallSecondaryContact:{type:String, required:true}
})
oncallschema.plugin(unique_validator);


module.exports=mongoose.model('OncallModel',oncallschema)
