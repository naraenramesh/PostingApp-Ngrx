import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as AuthActions from './auth-store/auth-actions'
import * as fromApp from '../app-store/app-reducer'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private store:Store<fromApp.AppState>,private route:ActivatedRoute,private router:Router) { }

  g:String;
  ngOnInit(): void {
    this.store.select('auth').pipe(map(authstate=>
      authstate.user
    )).subscribe(val =>
      {
        if(val)
        {
this.g=val.token
console.log("val" + this.g)
this.router.navigate(['../../' + 'begin'],{relativeTo:this.route})

        }
      })
  }

@ViewChild('authForm') af:NgForm;
signup=false;
Ontouch()
{
this.signup=!this.signup;
}
onsubmit(nh:NgForm){
//console.log(nh.value)
const username=nh.value.username;
const password=nh.value.password;


if(this.signup)
{
  console.log("signup")
this.store.dispatch(AuthActions.signup({username:username,password:password}))
}
else{
  this.store.dispatch(AuthActions.logintoDB({username:username,password:password}))

}
}
}



  export interface User
  {

    username:String;
    password:String;
    token?:String;
    expiresIn:Number;
  }
