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

    getTeamIssues(name:string)
    {
        this.getIssues(name).subscribe();     
        return this.issues
    }

getIssues(team:string)
{
    return this.http.get<any>("http://localhost:3000/api/issues/" + team)
    .pipe(map((issuedata)=>
    {
   return  issuedata.map((info)=>
   {
    return { 
        
issueId:info.issueId,
issue_title:info.issue_title,
issue_desc:info.issue_desc,
issue_date:info.issue_date,
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
  this.http.delete("http://localhost:3000/api/issues/" + issueid)
  .subscribe();
    this.ind =this.issues.indexOf(this.issues.find(name=>name.issueId===issueid))
    this.issues.splice(this.ind,1);
this.issuesStatus.next(this.issues.slice())
}

updateIssue(issueid:string,issueContent:Issues)
{
     this.ind =this.issues.indexOf(this.issues.find(name=>name.issueId===issueid))
    this.issues[this.ind]=issueContent;
    console.log(issueContent)
this.issuesStatus.next(this.issues.slice());
this.http.put('http://localhost:3000/api/issues/'+ issueid ,issueContent)
.subscribe();
}


addIssue(issue:Issues)
{
       console.log("going to add");
this.http.post<{issueId:string}>('http://localhost:3000/api/issues',issue)
.subscribe(response => {
 
const id=response.issueId;
console.log("Issue Id is: " +id)
issue.issueId=id;
console.log(issue);
this.issues.push(issue);
    this.issuesStatus.next(this.issues.slice());
 
});

}
  

}
