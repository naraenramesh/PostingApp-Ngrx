const express=require("express");
const IssuesModel= require('../models/issues');
const router=express.Router();

router.post('/',async(req,res,next)=>
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

const doc = await issues.save()

res.status(201).json(doc);

});

router.put('/:issueid',async (req,res,next)=>
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
const doc =await IssuesModel.updateOne({
    issueId:req.params.issueid}, issues)

const out= await IssuesModel.findOne({issueId:req.params.issueid})

res.status(200).json(out);

});
router.get('/:team',async (req,res,next)=>
{

//IssuesModel.collection.drop();

const out=await IssuesModel.find({
    related_team:req.params.team
})
  //console.log(out);
    res.status(200).json(out);
    //IssuesModel.remove().then(()=> //console.log("Deleted"))

});

router.delete('/:issueid',async (req,res,next)=>
{
    const out =await IssuesModel.deleteOne({issueId:req.params.issueid})

	const doc =await IssuesModel.find();

        res.status(200).json(doc);

}
)

module.exports=router;
