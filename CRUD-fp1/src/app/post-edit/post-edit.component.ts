import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post-list/post-list.component';
import * as fromApp from '../app-store/app-reducer'
import { Store } from '@ngrx/store';
import * as PostActions from '../post/post-store/post-action';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private store:Store<fromApp.AppState>) { }
initForm:FormGroup;
postscol:Post[]
id:String
ind:number
@ViewChild('postform') pf:NgForm;
  ngOnInit() {
    this.id= this.route.snapshot.params['id']
if(this.id)
{
    this.store.select('post').pipe(map(p=>
   p.posts
)).subscribe((out)=>
{this.postscol= out;
//console.log(this.ind)
}
)
this.ind=this.postscol.findIndex(fg=>fg.postId === this.id);
this.initForm= new FormGroup({ heading: new FormControl(this.postscol[this.ind].heading),
  content: new FormControl(this.postscol[this.ind].content)}  )
}
else{
  this.initForm= new FormGroup({ heading: new FormControl(null),
    content: new FormControl(null)}  )

}
}



  OnSubmit(pf:NgForm)
  {
    //console.log(this.ind)
    const post_arr={heading:this.pf.value.heading,content:this.pf.value.content}
    //console.log(post_arr);
    if(this.id)
{

  this.store.dispatch(PostActions.editinDB({id:this.id,post:post_arr}));
  this.router.navigate(['../../'], {relativeTo:this.route})

  }
else{


  this.store.dispatch(PostActions.savetoDB({post:post_arr}))
  this.router.navigate(['../'], {relativeTo:this.route})
}



}
}
