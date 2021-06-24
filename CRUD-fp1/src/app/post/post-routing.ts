import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostEditComponent } from "../post-edit/post-edit.component";
import { PostListComponent } from "../post-list/post-list.component";
import { PostComponent } from "./post.component";
import {PostResolver} from '../post/post-resolver'
import { AuthGuard } from "../auth/authguard";

const pr:Routes=[
  {

   path:'', component:PostComponent},
{
    path:'post', component:PostListComponent, resolve:[PostResolver]
    , canActivate:[AuthGuard]

  },{  path:'post/edit', component : PostEditComponent},{
    path:'post/edit/:id', component:PostEditComponent
  }
]
@NgModule({
  providers:[PostResolver],
  imports:[RouterModule.forChild(pr)],
  exports:[RouterModule]
})
export class PostRoutingModule{

}
