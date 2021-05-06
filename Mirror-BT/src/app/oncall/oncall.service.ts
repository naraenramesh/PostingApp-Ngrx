import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { oncall } from './../oncall/oncall-model';

@Injectable({providedIn:'root'})

export class oncallService{
  oncallSelected: any;

constructor(private http:HttpClient){}

oncall: oncall[]= [
  ];
    ind:number;
    oncallDateSelected= new BehaviorSubject<oncall>(null);

    oncallStatus=new BehaviorSubject<oncall[]>(null); 

    getTeamoncall(name:string)
    {
        this.getoncall(name).subscribe();     
        return this.oncall
    }

getoncall(team:string)
{
    return this.http.get<any>("http://localhost:3000/api/oncall/" + team)
    .pipe(map((oncalldata)=>
    {
   return  oncalldata.map((info)=>
   {
    return { 
        
oncallId:info.oncallId,
oncallDate:info.oncallDate,
oncallPrimary:info.oncallPrimary,
oncallSecondary:info.oncallSecondary,
oncallPrimaryEmail:info.oncallPrimaryEmail,
oncallPrimaryContact:info.oncallPrimaryContact,
oncallSecondaryEmail:info.oncallSecondaryEmail,
oncallSecondaryContact:info.oncallSecondaryContact

   }
   })  
    }),tap(oncall_loaded => {
      this.oncall=oncall_loaded;
      this.oncallStatus.next(this.oncall.slice())
      })
    )
  }

getoncallNames()
{

console.log("asso is " + this.oncall)
return this.oncall.map(asname =>asname.oncallDate)
}


getExlcudeoncallNames(name1?:Date)
{
    if(name1)
    {
      this.ind=this.oncall.indexOf(this.oncall.find(name=>name.oncallDate===name1))
 //this.oncall.splice(this.ind,1);
}
return this.oncall.map(tname =>tname.oncallDate);

}

updateoncall(oncallid:string,oncallContent:oncall)
{
     this.ind =this.oncall.indexOf(this.oncall.find(name=>name.oncallId===oncallid))
    this.oncall[this.ind]=oncallContent;
    console.log(oncallContent)
this.oncallStatus.next(this.oncall.slice());
this.http.put('http://localhost:3000/api/oncall/'+ oncallid ,oncallContent)
.subscribe();
}


addoncall(oncall:oncall)
{
       console.log("going to add");
this.http.post<{oncallId:string}>('http://localhost:3000/api/oncall',oncall)
.subscribe(response => {
 
const id=response.oncallId;
console.log("oncall Id is: " +id)
oncall.oncallId=id;
console.log(oncall);
this.oncall.push(oncall);
    this.oncallStatus.next(this.oncall.slice());
 
});

}
  

}
