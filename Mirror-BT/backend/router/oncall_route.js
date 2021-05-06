const express=require("express");
const OncallModel= require('../models/oncall');
const router=express.Router();

router.post('/',(req,res,next)=>
{
    const oncall=new OncallModel({ 
        oncallDate:req.body.OncallDate,
oncallPrimary:req.body.oncallPrimary,
oncallSecondary:req.body.oncallSecondary,
oncallPrimaryEmail:req.body.oncallPrimaryEmail,
related_team:req.body.related_team,
oncallPrimaryContact:req.body.oncallPrimaryContact,
oncallSecondaryEmail:req.body.oncallSecondaryEmail,
oncallSecondaryContact:req.body.oncallSecondaryContact

       })
           console.log(oncall);

oncall.save().then((oncalldata)=>{
    console.log(oncalldata)
    
res.status(201).json({
    oncallId:oncalldata.oncallId
});

});

});

router.put('/:oncallid',(req,res,next)=>
{
    const oncall={
        oncallId: req.params.oncallid,
        OncallDate:req.body.OncallDate,
oncallPrimary:req.body.oncallPrimary,
oncallSecondary:req.body.oncallSecondary,
oncallPrimaryEmail:req.body.oncallPrimaryEmail,
related_team:req.body.related_team,
oncallPrimaryContact:req.body.oncallPrimaryContact,
oncallSecondaryEmail:req.body.oncallSecondaryEmail
    }
OncallModel.updateOne({
    oncallId:req.params.oncallid}, oncall).then((oncalldata)=>{
   
    
res.status(200).json();

});
});

router.get('/:team',(req,res,next)=>
{

//OncallModel.collection.drop();

OncallModel.find({
    related_team:req.params.team
}).then((doc)=>{

//const doc= [
  
      console.log(doc);
    res.status(200).json(doc);
    //OncallModel.remove().then(()=> console.log("Deleted"))
})
});

router.delete('/:oncallid',(req,res,next)=>
{
    OncallModel.deleteOne({oncallId:req.params.oncallid}).then((result)=>
    {
        res.status(200).json();
    });
}
)

module.exports=router;