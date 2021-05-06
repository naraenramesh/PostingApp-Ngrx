const express=require("express");
const IssuesModel= require('../models/issues');
const router=express.Router();

router.post('/',(req,res,next)=>
{
    const issues=new IssuesModel({ 
        issue_title:req.body.issue_title,
issue_desc:req.body.issue_desc,
issue_date:req.body.issue_date,
issue_type:req.body.issue_type,
related_team:req.body.related_team,
issue_status:req.body.issue_status,
issue_updates:req.body.issue_updates
       })
           console.log(issues);

issues.save().then((issuesdata)=>{
    console.log(issuesdata)
    
res.status(201).json({
    issueId:issuesdata.issueId
});

});

});

router.put('/:issueid',(req,res,next)=>
{
    const issues={
        issueId: req.params.issueid,
        issue_title:req.body.issue_title,
issue_desc:req.body.issue_desc,
issue_date:req.body.issue_date,
issue_type:req.body.issue_type,
related_team:req.body.related_team,
issue_status:req.body.issue_status,
issue_updates:req.body.issue_updates
    }
IssuesModel.updateOne({
    issueId:req.params.issueid}, issues).then((issuesdata)=>{
   
    
res.status(200).json();

});
});

router.get('/:team',(req,res,next)=>
{

//IssuesModel.collection.drop();

IssuesModel.find({
    related_team:req.params.team
}).then((doc)=>{

//const doc= [
  
      console.log(doc);
    res.status(200).json(doc);
    //IssuesModel.remove().then(()=> console.log("Deleted"))
})
});

router.delete('/:issueid',(req,res,next)=>
{
    IssuesModel.deleteOne({issueId:req.params.issueid}).then((result)=>
    {
        res.status(200).json();
    });
}
)

module.exports=router;