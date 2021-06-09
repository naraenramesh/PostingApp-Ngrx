import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { oncall } from './../oncall/oncall-model';

@Injectable({providedIn:'root'})

export class oncallService{


constructor(private http:HttpClient){}

oncall: oncall[]= [
  ];
    ind:number;
    oncallDateSelected= new BehaviorSubject<oncall>(null);

    oncallStatus=new BehaviorSubject<oncall[]>(null);

getoncall(team:any)
{
    return this.http.post<any>("https://mirrorview.herokuapp.com/api/oncall/getdates",team)
    .pipe(map((oncalldata)=>
    {
   return  oncalldata.map((info)=>
   {
    return {

oncallId:info._id,
oncallDate:new Date(info.oncallDate),
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
      //console.log(oncall_loaded)
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

updateoncall(oncallContent:oncall)
{
  return this.http.put<any>('https://mirrorview.herokuapp.com/api/oncall/' ,oncallContent)
.pipe(map((oncalldata)=>
{
return  oncalldata.map((info)=>
{
return {

oncallId:info._id,
oncallDate:new Date(info.oncallDate),
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
  //console.log(this.oncall)
  this.oncallStatus.next(this.oncall.slice())
  })
)

}


addoncall(oncall:oncall)
{
  //console.log("kdkd")
return this.http.post<any>('https://mirrorview.herokuapp.com/api/oncall/',oncall)
.pipe(map((oncalldata)=>
{
return  oncalldata.map((info)=>
{
return {

oncallId:info._id,
oncallDate:new Date(info.oncallDate),
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

}
