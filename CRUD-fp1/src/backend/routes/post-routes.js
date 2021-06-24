const express=require('express');
const router=express.Router();
const PostController=require('../controller/post-controller')

router.get('/posts',PostController.getPosts)
router.post('/post',PostController.postPosts);
router.put('/post/:id',PostController.editPost);
router.delete('/post/:id',PostController.deletePost);
module.exports=router;
