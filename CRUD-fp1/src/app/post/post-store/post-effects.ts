import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {Actions,ofType,createEffect} from "@ngrx/effects"
import * as fromApp from "../../app-store/app-reducer"
import * as PostActions from "./post-action"
import { exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Post } from "src/app/post-list/post-list.component";

@Injectable()
export class PostEffect{

  constructor(private http:HttpClient ,private store:Store<fromApp.AppState>,private actions$:Actions){}

  fetchposteffect$= createEffect(()=>
  this.actions$.pipe(ofType(PostActions.FetchPosts),switchMap(()=>{
    return this.http.get<any>("http://localhost:3000/posts").pipe(map(postsraw=>{
      return postsraw.map(info=>{
        return {postId:info._id,
        heading:info.heading,
        content:info.content}
      })
    }))
  }),map(posts=>{
console.log(posts);
   return PostActions.setPosts({posts:posts});
 })
 )
 )
 postcopy=null;
 postcopyfinal=null;
 saveposteffect$=createEffect(()=>

 this.actions$.pipe(ofType(PostActions.savetoDB), exhaustMap((action)=>{
//console.log("hhh")
//console.log(action.post.heading);
this.postcopy=action.post;
  return this.http.post<any>("http://localhost:3000/post",
 action.post
)
 }),map(ps=>{
  if(ps.status === 200)
  {
this.postcopyfinal={postId:ps.postId,heading:this.postcopy.heading,content:this.postcopy.content};
    console.log(this.postcopy)
    return PostActions.addPost({post:this.postcopy})
  }

})
 )
 )
id=null;
editindb$= createEffect(()=>
this.actions$.pipe(ofType(PostActions.editinDB),exhaustMap((action)=>
{
  this.id=action.id;
this.postcopy=action.post;
return this.http.put<any>("http://localhost:3000/post/" + action.id, action.post)

}
),map(res=> {
  if(res.status===200)
  return PostActions.editPost({id:this.id, post:this.postcopy})}))

)


deleteindb$=createEffect(()=>
  this.actions$.pipe(ofType(PostActions.deleteinDB),exhaustMap((action)=>{
this.id=action.id;

    return this.http.delete<any>("http://localhost:3000/post/" + action.id)
  }),
  map(ps=>{
    if(ps.status===200)
    {
      return PostActions.deletePost({id:this.id})
    }
  }))
)
}
