import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { AuthRoutingModule } from "./auth-routing";
import * as fromAuth from '../auth/auth-store/auth-reducer'
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth-store/auth-effects";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
imports:[AuthRoutingModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
StoreModule.forFeature('auth',fromAuth.AuthReducer),
EffectsModule.forFeature([AuthEffects])]
})


export class AuthModule{}
