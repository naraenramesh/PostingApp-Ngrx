const User = require("../models/user-model")
const brcypt=require('bcryptjs');
const jk=require('jsonwebtoken');

module.exports.signup=(req,res,next)=>{


      console.log("gh");
    brcypt.hash(req.body.password,5).then(hash=>{
    console.log(hash);
    const user=new User({username:req.body.username,password:hash})

    user.save().then(rs=>{
      console.log("gghf");
      res.json({message:"User created", status:200})
    })

   }).catch(err=>console.log(err))

}

module.exports.login=(req,res,next)=>{

  User.findOne({username:req.body.username}).then(
    rs=> {
      gh=rs;
      return brcypt.compare(req.body.password,rs.password)}).then(rs=>{

        if(!rs)
        {
            return  res.status(401).json({
                message:'User Password is incorrect'
            })
        }

        const jwt=jk.sign({username:gh.username},'Create a super strong token',{expiresIn:'1hr'})
const expiresIn=30;
        User.findOne({username:req.body.username}).then(
          rs=> {
rs.token=jwt
rs.expiresIn=expiresIn
return rs.save();
          }

        ).then(console.log("User token updated"))
        res.json({token:jwt,expiresIn:expiresIn,message:'User LoggedIn',status:200})
      }
      ).catch(err=>{

        res.json({message:"Invalid credentials",status:500})
      })

    }
module.exports.tokencheck=(req,res,next)=>{
  User.findOne({username:req.body.username}).then(rs=>{
    if(rs.token === req.body.token)
    {
      res.json({status:200})
    }
    else{
      res.json({status:401})
    }
  }).catch(err=>console.log(err))

}


