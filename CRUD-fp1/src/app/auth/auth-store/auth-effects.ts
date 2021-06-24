import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, tap } from "rxjs/operators";
import * as Useractions from './auth-actions';
import {User} from '../auth.component'

@Injectable()
export class AuthEffects{


constructor(private http:HttpClient,private actions$:Actions)
{}

signup$=createEffect(()=>
 this.actions$.pipe(ofType(Useractions.signup),exhaustMap((action)=> {
   console.log(action.username);
  return this.http.post<any>("http://localhost:3000/user/signup",{username:action.username,
password:action.password})
}
),map((user)=>{
  if(user.status===200)
  {
   return console.log(user.message) }
})
)
,{dispatch:false}
)

usercopy=null;

login$=createEffect(()=>
this.actions$.pipe(ofType(Useractions.logintoDB),exhaustMap((action)=>{
  this.usercopy={username:action.username, password:action.password}

  return this.http.post<any>("http://localhost:3000/user/login", {username:action.username,password:action.password})

}),map(user=>{
  if(user.status===200)
   {


     const tt=new Date(new Date().getTime() + user.expiresIn * 1000 )
     const userdet={username:this.usercopy.username,token:user.token,expiresIn:tt}
localStorage.setItem('userdata',JSON.stringify(userdet));
const ff =
    new Date(tt).getTime() -
    new Date().getTime();
console.log(ff);

this.fff=setTimeout(()=>{ return Useractions.logout()},ff);


     console.log(user.token)
    return Useractions.login({username:this.usercopy.username,
  password:null,token:user.token})

  }
  else{
    {dispatch:false}
  }
})

)
)
fff=null;
userdata=null;
autologin$=createEffect(()=>
this.actions$.pipe(ofType(Useractions.autologin),exhaustMap(()=>{

  this.userdata= JSON.parse(localStorage.getItem('userdata'))

  return this.http.post<any>("http://localhost:3000/user/tokencheck",{token:this.userdata.token,
username:this.userdata.username})
}),map(rs=>{
 // const d=new Date().getTime();
  if(rs.status===200)
  {
console.log("rr")
const ff =
    new Date(this.userdata.expiresIn).getTime() -
    new Date().getTime();
console.log(ff);

this.fff=setTimeout(()=>{
   console.log("gh"),
   Useractions.logout()},ff);

    return Useractions.login({username:this.userdata.username,password:null,token:this.userdata.token})

  }
  else{
    {dispath:false}
  }
})

))

logoff$=createEffect(()=>
this.actions$.pipe(ofType(Useractions.logout),tap(()=>{
  clearTimeout(this.fff);
  return localStorage.removeItem('userdata');

})
),{dispatch:false})
}
