const mongoose=require('mongoose');

const postschema= mongoose.Schema({
heading:{type:String,required:true},
content:{type:String,required:true}
})


module.exports=mongoose.model('Post',postschema);
