import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Associate} from './associates.model'
import {AssociateService} from './associates.service'


@Injectable()
export class AssociateResolverService implements Resolve<Associate[]>{

    constructor( private as:AssociateService){}

 resolve(ars:ActivatedRouteSnapshot,rss:RouterStateSnapshot):Observable<Associate[]>|Promise<Associate[]> |Associate[]
 {
     return this.as.getAssociates();

  }
}

