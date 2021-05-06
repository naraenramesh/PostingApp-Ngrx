import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Team } from './team.model';
import { TeamService } from './team.service';


@Injectable()
export class TeamResolverService implements Resolve<Team[]>{

    constructor( private as: AuthService, private ts:TeamService){}

 resolve(ars:ActivatedRouteSnapshot,rss:RouterStateSnapshot):Observable<Team[]>|Promise<Team[]> |Team[]
 {
     return this.ts.getTeams();
    
  }   
}

