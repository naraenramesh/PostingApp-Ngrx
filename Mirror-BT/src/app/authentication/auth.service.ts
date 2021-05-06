import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

    export interface AuthResponseData
    {
 kind: string;
 username:string,
  idToken: string;
  email: string;
  privilege:string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
    }

    @Injectable()
export class AuthService
{
    constructor(private http:HttpClient, private router: Router){}

    
  user = new BehaviorSubject<User>(null);

   private tokenExpirationTimer: any;

   signup(uname:string, email: string, password: string, privilege: string) {
       console.log("Final is" + email,password)
    return this.http
      .post<AuthResponseData>(
     //   'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDljNKejmHVUmdVxq2bSsLg4eAKHfL6lPs',
     'http://localhost:3000/api/users/signup' ,  {
     username:uname,     
     email: email,
          password: password,
          privilege:privilege
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
            console.log(resData);
        })
      );
  }

  login(email: string, password: string) {
    console.log("Final is" + email,password)
    return this.http
      .post<AuthResponseData>(
        //'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDljNKejmHVUmdVxq2bSsLg4eAKHfL6lPs',
        'http://localhost:3000/api/users/login' ,
     {
          email: email,
          password: password
          
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
            console.log(resData);
          this.handleAuthentication(
            resData.username,
            resData.email,
            resData.privilege,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

    autoLogin() {

        const userData: {
          username:string,
          email: string;
          privilege:string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);
        if (!userData) {
          return;
        }
    console.log(userData);
        const loadedUser = new User(
          userData.username,
          userData.email,
          userData.privilege,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
    console.log(loadedUser)
        if (loadedUser.token) {
          this.user.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
                    this.autoLogout(expirationDuration);
        }
      }
    
      logout() {
        this.user.next(null);

        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }
    
      autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.logout();
        }, expirationDuration);
      }
    
    deleteUser(email:string)
    {
      return this.http
      .delete<AuthResponseData>(
             'http://localhost:3000/api/users/' + email
      )  .pipe(
        catchError(this.handleError),
        tap(resData => {
            console.log(resData);
        })
      );
    
    }
    
 updatePassword(email:string,password:string)
 {
  return this.http
  .put<AuthResponseData>(
         'http://localhost:3000/api/users/updatepassword',
         {
email:email,
password:password
         } 
  )  .pipe(
    catchError(this.handleError),
    tap(resData => {
        console.log(resData);
    })
  );


 }

    updateUser(email:string,privilege:string)
    {
      return this.http
      .put<AuthResponseData>(
             'http://localhost:3000/api/users',
             {
email:email,
privilege:privilege
             } 
      )  .pipe(
        catchError(this.handleError),
        tap(resData => {
            console.log(resData);
        })
      );
    
    }
    
  private handleAuthentication(
    username:string,
    email: string,
    privilege:string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username,email,privilege,userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(user);

  }

  private handleError(errorRes: HttpErrorResponse) {
    
   let errorMessage=errorRes.error.error_msg
    return throwError(errorMessage);
  }
}