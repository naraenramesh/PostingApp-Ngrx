const express= require("express");

const router =express.Router();
const TeamModel= require('../models/team');

router.post('/',async(req,res,next)=>
{
try{
    const team=new TeamModel({
        teamname: req.body.teamname,
        teamdesc:req.body.teamdesc,
        teamqueue:req.body.teamqueue,
        teammailId:req.body.teammailId
    })
const doc =await team.save()

res.status(201).json(doc)
}
catch(err){
  //console.log(err);
  res.status(401).json({error:'Unable to add Team'})
}
});

router.put('/:teamname',async (req,res,next)=>
{

	try {

const doc =await TeamModel.updateOne({_id:req.body.id},{$set:{
  teamname: req.body.teamname,
  teamdesc:req.body.teamdesc,
  teamqueue:req.body.teamqueue,
  teammailId:req.body.teammailId
    }})

	const out =await TeamModel.findOne({_id:req.body.id})

res.status(200).json(out);
}
catch(err){
  //console.log(err);
  res.status(401).json({error:'Unable to update Team'})
}
});

router.get('/',async (req,res,next)=>
{
try {
   const doc =await TeamModel.find()

    res.status(200).json(doc);
   // TeamModel.remove().then(()=> //console.log("Deleted"))

}
catch(err){
  //console.log(err);
  res.status(401).json({error:'Unable to fetch Teams'})
}
});

router.delete('/:teamname',async (req,res,next)=>
{
try {
   const out =await TeamModel.deleteOne({teamname:req.params.teamname})
   const doc =await TeamModel.find()
      res.status(200).json(doc);

}
catch(err){
  //console.log(err);
  res.status(401).json({error:'Unable to update Team'})
}
})

module.exports= router;
