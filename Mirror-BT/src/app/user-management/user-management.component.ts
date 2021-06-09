import { Component, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../authentication/auth.service';
import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnDestroy {
  isLoading = false;
  error: string = null;
  
  private authObs: Subscription;
@ViewChild('deleteForm') delform:NgForm 
@ViewChild('UpdateForm') updform:NgForm
  constructor(
    private authService: AuthService,
    private router: Router,
private hs:HelperService,)
{console.log(this.delform);
}

OnDeleteUser()
{
  const del_email= this.delform.value.email;
let delObs:Observable<AuthResponseData>;
this.isLoading=true;
console.log("data " +del_email)
delObs=this.authService.deleteUser(del_email);
delObs.subscribe(
  resData => {
    //console.log(resData);
    this.isLoading = false;
    this.hs.openSnackBar('User Deleted Successfully','Hurray!');
  },
  errorMessage => {
    //console.log(errorMessage);
    this.error = errorMessage;
    this.hs.openSnackBar(errorMessage,'Error');
    this.isLoading = false;
  }
);

this.delform.reset();

}


  onSubmit(form: NgForm) {
    
    const email = form.value.email;
    const uname=form.value.uname;
    const password = form.value.password;
    const privilege= form.value.privilege;
console.log(email,password,privilege)
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

      authObs = this.authService.signup(uname,email,password,privilege);
    
    authObs.subscribe(
      resData => {
        //console.log(resData);
        this.isLoading = false;
        this.hs.openSnackBar('User Created','Hurray!');
      },
      errorMessage => {
        this.error = errorMessage;
        this.hs.openSnackBar(this.error,'Error');
        this.isLoading = false;
      }
    );

    form.reset();
  }

  OnUpdateUser()
  {
    const upd_email= this.updform.value.email;
    const upd_privilege=this.updform.value.privilege;
  let updObs:Observable<AuthResponseData>;
  this.isLoading=true;
  updObs=this.authService.updateUser(upd_email,upd_privilege);
  updObs.subscribe(
    resData => {
      
      this.isLoading = false;
      this.hs.openSnackBar('User Updated Successfully','Hurray!');
    },
    errorMessage => {
      this.error = errorMessage;
      this.hs.openSnackBar(errorMessage,'Error');
      this.isLoading = false;
    }
  );
  
  this.updform.reset();
  
  }
  
  

  ngOnDestroy() {
    if (this.authObs) {
      this.authObs.unsubscribe();
    }
  }


}
