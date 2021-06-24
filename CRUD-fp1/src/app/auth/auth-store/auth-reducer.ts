import { state } from '@angular/animations';
import { Action, createReducer, on, State } from '@ngrx/store';
import { User } from '../auth.component';
import * as AuthActions from './auth-actions';

export interface AuthState {
 user:User
isloading:boolean
}

const initialstate:AuthState={user:null,isloading:true};
//const pack=[{username:'max',password:'max'}];

const  _authreducer= createReducer(initialstate,
  on(AuthActions.login,(state,action)=>({
...state,
isLoading:false,
user:{username:action.username,password:null,token:action.token,expiresIn:null}
  })

  ),on(AuthActions.logout,(state,action)=>({
    ...state,
    isLoading:false,
    user:null
  })))

  export function AuthReducer(state:AuthState,action:Action)
  {
    return _authreducer(state,action)
  }
