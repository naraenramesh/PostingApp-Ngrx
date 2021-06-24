
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map, exhaustMap } from 'rxjs/operators';
import * as fromApp from '../app-store/app-reducer';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate
{
constructor(private store:Store<fromApp.AppState>,private router:Router)
{}
  canActivate(ars:ActivatedRouteSnapshot,rss:RouterStateSnapshot):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree>
{

return this.store.select('auth').pipe(take(1),map(authstate=>authstate.user)
,map(user =>{
  if(!!user)
  {
    return true
  }
return this.router.createUrlTree(['/auth/auth']);
})
)
}
}
