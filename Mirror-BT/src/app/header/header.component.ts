import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  admin_role:string='';
  admin_trigger:boolean=false;
  uname:string='';
  email:string='';
  pwd:string='';
  constructor(private as:AuthService,private hs:HelperService,private router:Router) { }

  userSub:Subscription;
  authObs:Subscription;
  ngOnInit() {
    this.userSub = this.as.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    
      this.as.user.subscribe((data)=>
      {
        if(this.isAuthenticated)
        {
          this.uname=data.username;
    this.admin_role=data.privilege;
    this.email=data.email;
    if( this.admin_role === 'Admin')
    {
    this.admin_trigger=true;
    }
  }
      })
      
    }
    
  
  OnLogout()
{
  this.admin_trigger=false;
this.as.logout();
}

onSubmit(form:NgForm)
{

  this.pwd = form.value.password;
  console.log(form)
 this.as.updatePassword(this.email,this.pwd).subscribe(
  resData => {
    console.log(resData);
    this.hs.openSnackBar('Login again with updated Password','Hurray!');
   this.OnLogout();
  },
  errorMessage => {
  console.log(errorMessage)
    this.hs.openSnackBar(errorMessage,'Error');
      
  }
);
form.reset();
}


MakeStatic(event:any)
{
  event.stopPropagation();
}
ngOnDestroy() {
  this.userSub.unsubscribe();
  if (this.authObs) {
    this.authObs.unsubscribe();
  }
}

}
