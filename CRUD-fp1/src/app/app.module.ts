import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthEffects } from "./auth/auth-store/auth-effects";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import {StoreModule} from '@ngrx/store';
import { PostEditComponent } from './post-edit/post-edit.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from './auth/auth.component';

import { AuthModule} from './auth/auth-module';
import { Effect, EffectsModule } from '@ngrx/effects';
import { PostEffect } from './post/post-store/post-effects';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    PostEditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([EffectsModule])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
