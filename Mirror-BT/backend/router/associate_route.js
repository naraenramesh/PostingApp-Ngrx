const express=require("express");
const AssociateModel= require('../models/associate');
const router=express.Router();

router.post('/',(req,res,next)=>
{
    
    const associate=new AssociateModel({
        empname: req.body.empname,
        empcogemailid:req.body.empcogemailid,
        empBTemailid:req.body.empBTemailid,
        empcontactno:req.body.empcontactno,
        empUIN:req.body.empUIN,
		empTeams:req.body.empTeams
    })

    console.log(req);
    console.log(associate);

    console.log("btemail " + req.body.empBTemailid)
associate.save().then((associatedata)=>{
    console.log(associatedata)
    
res.status(201).json({
    associateId:associatedata._id
});

});
});

router.put('/:associatename',(req,res,next)=>
{
    const associate={
        id:req.body.empid,
        empname: req.body.empname,
        empcogemailid:req.body.empcogemailid,
        empBTemailid:req.body.empBTemailid,
        empcontactno:req.body.empcontactno,
        empUIN:req.body.empUIN,
		empTeams:req.body.empTeams
    }
AssociateModel.updateOne({
    empname:req.params.associatename}, associate).then((associatedata)=>{
   
    
res.status(200).json();

});
});

router.get('/',(req,res,next)=>
{
   AssociateModel.find().then((doc)=>{
    
//const doc= [
  //       {empname:'Narayanan',empcogemailid:'dfy',
//empBTemailid:'frr',
  //  empcontactno:'3344444444444',
    //empUIN:'45454545',
    //empTeams:['nexus','bsm']}]
      
    console.log(doc);
    res.status(200).json(doc);
   // AssociateModel.remove().then(()=> console.log("Deleted"))
})
});

router.delete('/:associatename',(req,res,next)=>
{
    AssociateModel.deleteOne({empname:req.params.associatename}).then((result)=>
    {
        res.status(200).json();
    });
}
)

module.exports=router;