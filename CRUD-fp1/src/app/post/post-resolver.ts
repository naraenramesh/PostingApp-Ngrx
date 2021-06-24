import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import { Store } from '@ngrx/store';
import {Post} from '../post-list/post-list.component';
import * as fromApp from '../app-store/app-reducer';
import * as PostActions from './post-store/post-action';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({providedIn:'root'})

export class PostResolver implements Resolve<{posts:Post[]}>{

constructor(private store:Store<fromApp.AppState>,private actions$:Actions){

}
  resolve( ars:ActivatedRouteSnapshot, rss:RouterStateSnapshot)
  {

  return this.store.select('post').pipe(take(1),map(poststate=>poststate.posts),
  switchMap(posts=>{
    if(posts.length === 0)
    {
      this.store.dispatch(PostActions.FetchPosts())
      return this.actions$.pipe(ofType(PostActions.setPosts))
    }
    else{
      return of({posts})
    }
  }))
}
}
