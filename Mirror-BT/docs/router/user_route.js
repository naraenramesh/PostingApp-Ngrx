const express=require("express");
const bcrypt=require("bcryptjs");
const router=express.Router();
const UserModel=require('../models/user')
const jwt=require('jsonwebtoken')


router.post('/signup',(req,res,next)=>
{
bcrypt.hash(req.body.password, 10).then(hash =>{
    const user=new UserModel({
      username:req.body.username,
        email:req.body.email,
        password:hash,
        privilege:req.body.privilege
    })
    user.save().then(result=>{
        res.status(200).json({
            message:'User Created'
        })
    }).catch(err=>{
res.status(401).json({
    error_msg:"User Creation failed"
});

    })
})

})
let fuser;
router.post('/login',(req,res,next)=>{

    UserModel.findOne({
        email:req.body.email
    }).then(matched_user=>{
          if(!matched_user)
        {
            return res.status(401).json({
                error_msg:'User not found'
            })
        }
      fuser=matched_user;
             return bcrypt.compare(req.body.password,matched_user.password)

    }).then(result =>
        {
            if(!result)
            {
                return  res.status(401).json({
                    error_msg:'User Password is incorrect'
                })
            }
            const token=jwt.sign(
                {email:fuser.email,userId:fuser._id},
                'word_to_create_strong_token',
                {expiresIn:'1h'}     )
            res.status(200).json({
                message:'User logged in',
                username:fuser.username,
                email:fuser.email,
                privilege:fuser.privilege,
                localID:fuser._id,
                idToken:token,
                expiresIn:'3600'
            })
        }).catch(err=>{
              return  res.status(401).json({
                    error_msg:'User not logged in'
                })



        })

})

router.delete('/:email',(req,res,next)=>
{
    UserModel.findOne({
        email:req.params.email
    }).then(matched_user=>{
          if(!matched_user)
        {
            return res.status(401).json({
                error_msg:'User not found'
            })
        }

UserModel.deleteOne({email:req.params.email}).then((result)=>
{
    res.status(200).json({message:"User Deleted from Mirror"})

}).catch(err =>{
    res.status(404).json({message:"User deletion failed"})

})
})
})

router.put('/',(req,res,next)=>
{
    UserModel.updateOne({email:req.body.email},{$set:{privilege:req.body.privilege}})
    .then((updres)=>
    {
        //console.log(updres)
        res.status(200).json({message:"User Privilege Updated"})
    }).catch(err =>{
        res.status(404).json({message:"User update failed"})

    })
})

router.put('/updatepassword',(req,res,next)=>
{

    bcrypt.hash(req.body.password, 10).then(hash =>{
        UserModel.updateOne({email:req.body.email},{$set:{password:hash}})
  .then(result=>{
            res.status(200).json({
                message:'User Password Updated',
                result:result
            }).catch(err=>{
                //console.log(err)
                res.status(500).json({
        error:'User Password Update failed'

    });
            })
        })
    })
})

router.post('/check',(req,res,next)=>{
  //console.log("Hi")
  res.status(200).json({check:"checked"})
})
module.exports=router;
