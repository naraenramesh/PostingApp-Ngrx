import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PostRoutingModule } from "./post-routing";
import { PostEffect } from "./post-store/post-effects";
import * as fromPosts from "./post-store/post-reducer";


@NgModule({
 imports:[
  PostRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  StoreModule.forFeature('post',fromPosts.Postreducer),
  EffectsModule.forFeature([PostEffect])
 ]

})

export class PostModule{

}
