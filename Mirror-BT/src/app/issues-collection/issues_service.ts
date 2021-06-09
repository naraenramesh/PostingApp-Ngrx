import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Issues } from './issues_model';

@Injectable({providedIn:'root'})

export class IssuesService{

constructor(private http:HttpClient){}

issues: Issues[]= [
  ];
    ind:number;
    issue_titleSelected= new BehaviorSubject<Issues>(null);

    issuesStatus=new BehaviorSubject<Issues[]>(null);



getIssues(team:string)
{
    return this.http.get<any>("https://mirrorview.herokuapp.com/api/issues/" + team)
    .pipe(map((issuedata)=>
    {
   return  issuedata.map((info)=>
   {
    return {

issueId:info.issueId,
issue_title:info.issue_title,
issue_desc:info.issue_desc,
issue_date:new Date(info.issue_date),
issue_type:info.issue_type,
related_team:info.related_team,
issue_status:info.issue_status,
issue_updates:info.issue_updates


   }
   })
    }),tap(issue_loaded => {
      this.issues=issue_loaded;
      this.issuesStatus.next(this.issues.slice())
      })
    )
  }

getIssuesNames()
{

console.log("asso is " + this.issues)
return this.issues.map(asname =>asname.issue_title)
}

getIssue(name1:string)
{
return this.issues.find(name=>name.issue_title===name1);
}


getExlcudeIssuesNames(name1?:string)
{
    if(name1)
    {
      this.ind=this.issues.indexOf(this.issues.find(name=>name.issue_title===name1))
 //this.issues.splice(this.ind,1);
}
return this.issues.map(tname =>tname.issue_title.toUpperCase())

}


deleteIssue(issueid:string)
{
  return this.http.delete<any>("https://mirrorview.herokuapp.com/api/issues/" + issueid)
  .pipe(map((issuedata)=>
  {
 return  issuedata.map((info)=>
 {
  return {

issueId:info.issueId,
issue_title:info.issue_title,
issue_desc:info.issue_desc,
issue_date:new Date(info.issue_date),
issue_type:info.issue_type,
related_team:info.related_team,
issue_status:info.issue_status,
issue_updates:info.issue_updates


 }
 })
  }),tap(issue_loaded => {
    this.issues=issue_loaded;
    this.issuesStatus.next(this.issues.slice())
    })
  )}

updateIssue(issueid:string,issueContent:Issues)
{
  return  this.http.put<any>('https://mirrorview.herokuapp.com/api/issues/'+ issueid ,issueContent)
.pipe(map((info)=>
{
return {

issueId:info.issueId,
issue_title:info.issue_title,
issue_desc:info.issue_desc,
issue_date:new Date(info.issue_date),
issue_type:info.issue_type,
related_team:info.related_team,
issue_status:info.issue_status,
issue_updates:info.issue_updates

}
}),tap(issue_loaded => {
  this.issues[this.issues.indexOf(this.issues.find(name=>name.issueId===issueid))]=issue_loaded;
  this.issuesStatus.next(this.issues.slice())
  })
)
}


addIssue(issue:Issues)
{

return this.http.post<any>('https://mirrorview.herokuapp.com/api/issues',issue)
.pipe(map((info)=>
{
return {

issueId:info.issueId,
issue_title:info.issue_title,
issue_desc:info.issue_desc,
issue_date:new Date(info.issue_date),
issue_type:info.issue_type,
related_team:info.related_team,
issue_status:info.issue_status,
issue_updates:info.issue_updates

}
}),tap(issue_loaded => {
  this.issues.push(issue_loaded);
  this.issuesStatus.next(this.issues.slice())
  })
)

}


}
