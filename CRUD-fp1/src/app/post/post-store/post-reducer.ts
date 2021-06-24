import { Action, createReducer, on } from "@ngrx/store";
import { Post } from "../../post-list/post-list.component";
import * as PostActions from "./post-action";

export interface State{
  posts: Post[]
}

const initialstate:State=
{posts:[]
}

const _postreducer= createReducer(initialstate,
  on(PostActions.setPosts,(state,action)=>({
...state,
posts:[...action.posts]
  })),
  on(PostActions.addPost,(state,action)=>({
...state,
posts:state.posts.concat(action.post)
  })),
  on(PostActions.deletePost,(state,action)=>({
    ...state,
    posts: state.posts.filter((post)=> post.postId !== action.id)
  })),
  on(PostActions.editPost,(state,action)=>({
    ...state,
    posts:state.posts.map((post,index) => post.postId === action.id ? action.post: post)
  }))

  )


  export function Postreducer(state:State,action:Action)
  {

    return _postreducer(state,action)
  }
