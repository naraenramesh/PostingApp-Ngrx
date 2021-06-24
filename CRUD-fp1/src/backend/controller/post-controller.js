
const Post=require('../models/post-model')

module.exports.getPosts=(req,res,next)=>{
 // const posts=[{"heading":"This is first post","content":"This is all about motivation"},{"heading":"This is econd post","content":"This is all about success"}]
//Post.remove().then(c=>console.log("collection dropped"));
Post.find().then(posts=>
res.send(posts).status(200)
).catch(err=>console.log(err))
}

module.exports.postPosts=(req,res,next)=>{

  const post=new Post({heading:req.body.heading,content:req.body.content})
 post.save().then(rs=>{console.log(post)
  res.json({postId:rs.id,message:"Post Created",status:200})
 .status(200)})
 .catch(err=>console.log(err));

}

module.exports.editPost=(req,res,next)=>{
console.log("ID" + req.params.id)

//updpost={id:req.params.id,heading:req.body.heading,content:req.body.content}
Post.findById(req.params.id).then(rs=>{rs.heading=req.body.heading,
  rs.content=req.body.content
  rs.id=req.params.id
  return rs.save().then(res.json({message:"Post Updated",status:200})).catch(err=>console.log(err))

    })

  }
module.exports.deletePost=(req,res,next)=>{
  Post.findByIdAndDelete(req.params.id).then(rs=>res.json({message:"Post Deleted",status:200})).catch(err=>console.log(err))
}
