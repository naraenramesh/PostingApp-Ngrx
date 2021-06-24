import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-reducer';
import * as PostActions from './post-store/post-action';
import * as Useractions from '../auth/auth-store/auth-actions'



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  constructor(private store:Store<fromApp.AppState>){}

  ngOnInit(){
    this.store.dispatch(PostActions.FetchPosts())
  }

  Onlogout(){
    this.store.dispatch(Useractions.logout());
  }
}
