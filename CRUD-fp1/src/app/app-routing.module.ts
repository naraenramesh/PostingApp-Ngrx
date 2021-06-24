import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path:'begin'
    ,loadChildren:()=>import('./post/post-module').then(m => m.PostModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth-module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
