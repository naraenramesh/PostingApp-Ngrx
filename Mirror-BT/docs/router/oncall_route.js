const express=require("express");
const OncallModel= require('../models/oncall');
const router=express.Router();


router.post('/',async (req,res,next)=>
{
  let dates=[]
 let finout=[]
  const getDatesBetweenDates = (startDate, endDat) => {

    //to avoid modifying the original date
    const endDate=new Date(endDat)
    const theDate = new Date(startDate)
    //console.log(theDate, endDate)
    while (theDate < endDate) {

      dates.push(new Date(theDate))

      theDate.setDate(theDate.getDate() + 1)

    }
    dates.push(endDate)
    return dates
  }
  getDatesBetweenDates(req.body.oncallDateStart, req.body.oncallDateEnd)
  let i=0;
let oncall=null;
  for (i=0;i < dates.length; i++ )
  {

     oncall=new OncallModel({
        oncallDate:dates[i],
oncallPrimary:req.body.oncallPrimary,
oncallSecondary:req.body.oncallSecondary,
oncallPrimaryEmail:req.body.oncallPrimaryEmail,
related_team:req.body.related_team,
oncallPrimaryContact:req.body.oncallPrimaryContact,
oncallSecondaryEmail:req.body.oncallSecondaryEmail,
oncallSecondaryContact:req.body.oncallSecondaryContact

       })
try{
const oncalldata= await oncall.save()
console.log(oncalldata);
finout.push(oncalldata)

res.status(201).json(
  finout);
}
  catch(err){
    //console.log(err);
}

}
});


router.put('/', async(req,res,next)=>
{

  let dates=[];
  let finout=[];
  const getDatesBetweenDates = (startDate, endDat) => {

    //to avoid modifying the original date
    const endDate=new Date(endDat)
    const theDate = new Date(startDate)
    //console.log(theDate, endDate)
    while (theDate < endDate) {

      dates.push(new Date(theDate))

      theDate.setDate(theDate.getDate() + 1)

    }
    dates.push(endDate)
    return dates
  }
  getDatesBetweenDates(req.body.oncallDateStart, req.body.oncallDateEnd)

try{

 const out= await OncallModel.updateMany({related_team: req.body.related_team,oncallDate:dates},{$set:{oncallPrimary:req.body.oncallPrimary,
 oncallSecondary:req.body.oncallSecondary,oncallPrimaryEmail:req.body.oncallPrimaryEmail,
 oncallPrimaryContact:req.body.oncallPrimaryContact,oncallSecondaryContact:req.body.oncallSecondaryContact,
 oncallSecondaryEmail:req.body.oncallSecondaryEmail}})

 const doc=await OncallModel.find({
  related_team:req.body.related_team
,oncallDate:dates})


console.log(doc)
 res.status(201).json(doc);

 }

catch(err)
{
  //console.log(err)
}

});


router.post('/getdates',async(req,res,next)=>
{

//OncallModel.collection.drop();
let dates=[]

  const getDatesBetweenDates = (startDate, endDat) => {

    //to avoid modifying the original date
    const endDate=new Date(endDat)
    const theDate = new Date(startDate)
    //console.log("d " + theDate, endDate)
    while (theDate < endDate) {

      dates.push(new Date(theDate))

      theDate.setDate(theDate.getDate() + 1)

    }
    dates.push(endDate)
    return dates
  }
  getDatesBetweenDates(req.body.oncallDateStart, req.body.oncallDateEnd)
  //console.log(dates)
  let i=0;
try{
const doc=await OncallModel.find({
    related_team:req.body.team
,oncallDate:dates})

res.status(200).json(doc);

}
catch(err){
  //console.log(err);
}


});


router.delete('/:oncallid',async(req,res,next)=>
{

//OncallModel.collection.drop();
let dates=[]

  const getDatesBetweenDates = (startDate, endDat) => {

    //to avoid modifying the original date
    const endDate=new Date(endDat)
    const theDate = new Date(startDate)
    //console.log("d " + theDate, endDate)
    while (theDate < endDate) {

      dates.push(new Date(theDate))

      theDate.setDate(theDate.getDate() + 1)

    }
    dates.push(endDate)
    return dates
  }
  getDatesBetweenDates(req.body.oncallDateStart, req.body.oncallDateEnd)
  //console.log(dates)
  let i=0;
try{
const doc=await OncallModel.deleteMany({
    related_team:req.body.team
,oncallDate:dates})

res.status(200).json(doc);

}
catch(err){
  //console.log(err);
}

})

module.exports=router;
