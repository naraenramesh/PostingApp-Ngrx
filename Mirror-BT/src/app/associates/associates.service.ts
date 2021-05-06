import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Associate } from './associates.model';

@Injectable({providedIn:'root'})
export class AssociateService
{
constructor(private http:HttpClient){}

associates: Associate[]= [
  //{aId:'3434',aname:'Narayanan',acogemailid:'Narayanan.p@cognizant.com',aBTemailid:'narayanan.nnp@bt.com',aContactno:'9452432432',aUIN: '611588690', aTeams:['Nexus','BSM']}
];
    ind:number;
    associatenameSelected= new BehaviorSubject<string>('');

    associatesStatus=new BehaviorSubject<Associate[]>(null); 

    empnameSelected=new BehaviorSubject<string>('');

getAssociates()
{

    return this.http.get<any>('http://localhost:3000/api/associates')
    .pipe(map((empdata)=>
    {
   return  empdata.map((info)=>
   {
    return { 
      empId:info._id,
    empname:info.empname,
  empcogemailid:info.empcogemailid,
  empBTemailid:info.empBTemailid,
  empcontactno:info.empcontactno,
  empUIN:info.empUIN,
  empTeams:info.empTeams
}
   })  
    }),tap(emp_loaded => {
      this.associates=emp_loaded;
      console.log(this.associates)
      this.associatesStatus.next(this.associates.slice())
      })
    )
  }

getAssociateNames()
{

return this.associates.map(asname =>asname.empname)
}

getAssociate(name1:string)
{
return this.associates.find(name=>name.empname===name1);
}

getTeamAssociates(name:string)
{
  return this.associates.filter(a=>a.empTeams.find(b=>b===name));
 }

getExlcudeAssociateNames(name1?:string)
{
    if(name1)
    {
      this.ind=this.associates.indexOf(this.associates.find(name=>name.empname===name1))
 //this.associates.splice(this.ind,1);
}
return this.associates.map(tname =>tname.empname.toUpperCase())

}


deleteAssociate(name1:string)
{
  this.http.delete("http://localhost:3000/api/associates/" + name1)
  .subscribe();
    this.ind =this.associates.indexOf(this.associates.find(name=>name.empname===name1))
    this.associates.splice(this.ind,1);
this.associatesStatus.next(this.associates.slice())
}

updateAssociate(associate:string,associateContent:Associate)
{
     this.ind =this.associates.indexOf(this.associates.find(name=>name.empname===associate))
    this.associates[this.ind]=associateContent;
    console.log(associateContent)
this.associatesStatus.next(this.associates.slice());
this.http.put('http://localhost:3000/api/associates/'+ associate ,associateContent)
.subscribe();
}
addAssociate(associate:Associate)
{
       console.log("going to add");
this.http.post<{associateId:string}>('http://localhost:3000/api/associates',associate)
.subscribe(response => {
 
const id=response.associateId;
console.log(id)
associate.empId=id;
console.log(associate);
this.associates.push(associate);
    this.associatesStatus.next(this.associates.slice());
 
});

}
  

}