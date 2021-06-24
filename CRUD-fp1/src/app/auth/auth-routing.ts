import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AuthComponent} from './auth.component';

 const authroute:Routes=[{
   path:'auth', component:AuthComponent
 }]

@NgModule({
imports:[
RouterModule.forChild(authroute)
],
exports:[
  RouterModule
]
})

export class AuthRoutingModule
{

}
