const express=require('express');
const router=express.Router();
const UserController=require('../controller/user-controller')

router.post('/login',UserController.login);
router.post('/signup',UserController.signup);
router.post('/tokencheck',UserController.tokencheck);
module.exports=router;
