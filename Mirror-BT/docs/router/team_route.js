const express= require("express");

const router =express.Router();
const TeamModel= require('../models/team');

router.post('/',(req,res,next)=>
{
    const team=new TeamModel({
        teamname: req.body.teamname,
        teamdesc:req.body.teamdesc,
        teamqueue:req.body.teamqueue,
        teammailId:req.body.teammailId
    })
team.save().then((teamdata)=>{
    
res.status(201).json({
    teamId:teamdata._id
});

});
});

router.put('/:teamname',(req,res,next)=>
{
    const team={
        id:req.body.id,
        teamname: req.body.teamname,
        teamdesc:req.body.teamdesc,
        teamqueue:req.body.teamqueue,
        teammailId:req.body.teammailId
    }
TeamModel.updateOne({
    teamname:req.params.teamname}, team).then((teamdata)=>{
   
    
res.status(200).json();

});
});

router.get('/',(req,res,next)=>
{
   TeamModel.find().then((doc)=>{
//const doc= [
  //  {teamname:'Nexus',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS'
    //,teammailId:'cognizantteam@cognizant.com'}] 
    
    res.status(200).json(doc);
   // TeamModel.remove().then(()=> console.log("Deleted"))
})
});

router.delete('/:teamname',(req,res,next)=>
{
    TeamModel.deleteOne({teamname:req.params.teamname}).then((result)=>
    {
    });
}
)

module.exports= router;