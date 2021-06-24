import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from './app-store/app-reducer';
import * as UserActions from './auth/auth-store/auth-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CRUD-fp1';

  constructor(private store:Store<fromApp.AppState>){}
ngOnInit()
{
  const userdata= JSON.parse(localStorage.getItem('userdata'))

  if(userdata)
  {
  this.store.dispatch(UserActions.autologin());
  if(new Date(userdata.expiresIn).getTime() < new Date().getTime())
  {
    console.log("ss");
this.store.dispatch(UserActions.logout());
  }
  }
}

}
