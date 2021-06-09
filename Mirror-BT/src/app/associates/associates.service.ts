import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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


getAssociates()
{

    return this.http.get<any>('https://mirrorview.herokuapp.com/api/associates')
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
      //console.log(this.associates)
      this.associatesStatus.next(this.associates.slice())
      }),catchError((em:HttpErrorResponse)=>{

        let errorMessage=em.error.error_msg
        return throwError(errorMessage);
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
 return this.http.delete<any>("https://mirrorview.herokuapp.com/api/associates/" + name1).pipe(map((empdata)=>
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
    //console.log(this.associates)
    this.associatesStatus.next(this.associates.slice())
    }),catchError((em:HttpErrorResponse)=>{
console.log(em);
      let errorMessage=em.error.error
      return throwError(errorMessage);
    })
  )


}

updateAssociate(associate:string,associateContent:Associate)
{

return this.http.put<any>('https://mirrorview.herokuapp.com/api/associates/'+ associate ,associateContent)
.pipe(catchError((em:HttpErrorResponse)=>{
  //console.log(em);
  let errorMessage=em.error.error
  return throwError(errorMessage);
}),map((info)=>
    {
      //console.log(info)

    return {
      empId:info._id,
    empname:info.empname,
  empcogemailid:info.empcogemailid,
  empBTemailid:info.empBTemailid,
  empcontactno:info.empcontactno,
  empUIN:info.empUIN,
  empTeams:info.empTeams
}

    }),tap(emp_loaded => {
           this.associates[this.associates.indexOf(this.associates.find(as => as.empId === associateContent.empId))           ]=emp_loaded;
      //console.log(this.associates)
      this.associatesStatus.next(this.associates.slice())
      })

)

}

addAssociate(associate:Associate)
{
return this.http.post<any>('https://mirrorview.herokuapp.com/api/associates',associate)
.pipe(catchError((em:HttpErrorResponse)=>{
  let errorMessage=em.error.error
  return throwError(errorMessage);
}),map((info)=>
    {
      //console.log(info)

    return {
      empId:info._id,
    empname:info.empname,
  empcogemailid:info.empcogemailid,
  empBTemailid:info.empBTemailid,
  empcontactno:info.empcontactno,
  empUIN:info.empUIN,
  empTeams:info.empTeams
}

    }),tap(emp_loaded => {
      this.associates.push(emp_loaded);
      //console.log(this.associates)
      this.associatesStatus.next(this.associates.slice())
      })

)}


}
