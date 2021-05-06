const mongoose= require('mongoose');

const teamSchema= mongoose.Schema({
    teamname :String,
    teamdesc:String,
    teamqueue:String,
    teammailId:String
});

module.exports=mongoose.model('TeamModel',teamSchema)
