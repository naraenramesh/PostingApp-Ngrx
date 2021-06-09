const mongoose= require('mongoose');

const teamSchema= mongoose.Schema({
    teamname :{type:String, required:true, unique:true},
    teamdesc:{type:String, required:true, unique:true},
    teamqueue:{type:String, unique:true},
    teammailId:{type:String, required:true}
});

module.exports=mongoose.model('TeamModel',teamSchema)
