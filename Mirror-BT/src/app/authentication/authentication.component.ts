import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { HelperService } from '../shared/helper.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnDestroy {
    isLoading = false;
    error: string = null;
    
    private authObs: Subscription;
  
    constructor(
      private authService: AuthService,
      private router: Router,
 private hs:HelperService,)
 {}
  
  
    onSubmit(form: NgForm) {
      
      const email = form.value.email;
      const password = form.value.password;
  console.log(email,password)
      let authObs: Observable<AuthResponseData>;
  
      this.isLoading = true;
  
        authObs = this.authService.login(email, password);
        
      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.hs.openSnackBar('Logged in','Hurray!');
          this.router.navigate(['/begin']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.hs.openSnackBar(errorMessage,'Error');
          this.isLoading = false;
        }
      );
  
      form.reset();
    }
    
    ngOnDestroy() {
      if (this.authObs) {
        this.authObs.unsubscribe();
      }
    }
  
  
}
