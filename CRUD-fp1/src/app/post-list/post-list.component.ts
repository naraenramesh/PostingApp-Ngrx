import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-reducer'
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as PostActions from '../post/post-store/post-action';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  radian:Post[];
  subscription:Subscription;
  id=null;
  constructor(private store:Store<fromApp.AppState>,
    private router:Router,private route:ActivatedRoute){}

  ngOnInit(){
    this.subscription = this.store
    .select('post')
    .pipe(map(postState => postState.posts))
    .subscribe((posts: Post[]) => {
     // console.log(posts);
      // console.log('Hi')
      this.radian = posts;
    });  }

ngOnDestroy(){
this.subscription.unsubscribe();
}
   // radian:Post[]=[{headin0g:"This is a first Post", content:"This post is all about practice"}]

  Onedit(index:number){

    this.id=this.radian[index].postId;
this.router.navigate(['edit',this.id],{relativeTo:this.route})
  }
  Ondelete(index:number){
    this.id=this.radian[index].postId;
//this.router.navigate(['delete',index], {relativeTo:this.route})
this.store.dispatch(PostActions.deleteinDB({id:this.id}))
//this.router.navigate(['../'],{relativeTo:this.route})
  }
}
export interface Post{
  postId?:String,
  heading:String,
  content:String
}
