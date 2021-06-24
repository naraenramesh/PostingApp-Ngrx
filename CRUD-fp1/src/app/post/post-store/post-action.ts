import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/post-list/post-list.component";


export const setPosts=createAction(
  '[Post] Display Posts',
  props<{
    posts:Post[]
  }>()
)

export const FetchPosts=createAction(
  '[Post] Fetch Posts'
)

export const savetoDB=createAction('[Post] Save Post',props<{
post:Post
}>())

export const addPost=createAction('[Post] Add Post',props<{
  post:Post
}>()
)

export const editPost=createAction('[Post]Edit Post',props<{id:String,post:Post}>())

export const deletePost=createAction('[Post]Delete Post',props<{id:String}>())

export const editinDB=createAction('[Post] Edit in DB', props<{id:String,post:Post}>())

export const deleteinDB=createAction('[Post]Delete in DB',props<{id:String}>())
