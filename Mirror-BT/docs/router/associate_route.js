const express=require("express");
const AssociateModel= require('../models/associate');
const router=express.Router();

router.post('/',async(req,res,next)=>
{
try{
    const associate=new AssociateModel({
        empname: req.body.empname,
        empcogemailid:req.body.empcogemailid,
        empBTemailid:req.body.empBTemailid,
        empcontactno:req.body.empcontactno,
        empUIN:req.body.empUIN,
		empTeams:req.body.empTeams
    })
const doc =await associate.save()
res.status(201).json(doc);
}
catch(err){
  //console.log(err);
  res.status(401).json({error:'Unable to add associate'})
}

});

router.put('/:associatename',async(req,res,next)=>
{
  try{

const out= await AssociateModel.updateOne({_id:req.body.empId},{$set:{
  empname: req.body.empname,
  empcogemailid:req.body.empcogemailid,
  empBTemailid:req.body.empBTemailid,
  empcontactno:req.body.empcontactno,
  empUIN:req.body.empUIN,
empTeams:req.body.empTeams
}})


const doc =await AssociateModel.findOne({_id:req.body.empId})

res.status(200).json(doc);
}
catch(err){
  //console.log(err);
  res.status(400).json({error:'Unable to update associate'})
}

});

router.get('/', async(req,res,next)=>
{
  try{
   const doc =await AssociateModel.find();
    res.status(200).json(doc);
  }
  catch(err){
    //console.log(err);
    res.status(400).json({error:'Unable to fetch associate'})
  }
})

router.delete('/:associatename',async(req,res,next)=>
{
  try{
    const doc = await AssociateModel.deleteOne({empname:req.params.associatename})
    const output= await AssociateModel.find();
    res.status(200).json(output)
  }
  catch(err){
    //console.log(err);
    res.status(400).json({error:'Unable to delete associate'})
  }

}
)

module.exports=router;
