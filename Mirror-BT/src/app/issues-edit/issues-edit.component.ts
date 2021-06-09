import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Issues } from '../issues-collection/issues_model';
import { IssuesService } from '../issues-collection/issues_service';
import { HelperService } from '../shared/helper.service';
import { TeamService } from '../teams/team.service';

@Component({
  selector: 'app-issues-edit',
  templateUrl: './issues-edit.component.html',
  styleUrls: ['./issues-edit.component.css']
})
export class IssuesEditComponent implements OnInit {
  constructor(private ts:IssuesService,private ru:ActivatedRoute,
    private rs:Router,private hs:HelperService, private tservice:TeamService)
  {}
  issue_titles:string[];
  iname:string;
  tname:string;
  issueSel:Issues;
  issuesForm:FormGroup;
  edit_trigger:boolean=false;
  ngOnInit() {
    this.edit_trigger=false;
this.tservice.teamnameSelected.subscribe((name:string)=>{
  this.tname=name;
  //console.log("ttname is" + name)
  })
    this.ts.issue_titleSelected.subscribe((sel_issue:Issues)=>{
this.issueSel=sel_issue;
})
if(this.issueSel)
{
this.edit_trigger=true;
}
this.initForm();

  }

   initForm()
  {
let  issue_title='';
let  issue_desc='';
let  issue_date=new Date('');
let  issue_type='';
let  related_team='';
let  issue_status='';
let  issue_updates='';

if(this.edit_trigger)
{
     issue_title=this.issueSel.issue_title;
    issue_date=this.issueSel.issue_date;
    issue_type=this.issueSel.issue_type;
    related_team=this.issueSel.related_team;
    issue_status=this.issueSel.issue_status;
 issue_desc=this.issueSel.issue_desc;
    issue_updates=this.issueSel.issue_updates;

  }

  this.issue_titles=this.ts.getExlcudeIssuesNames();

  this.issuesForm =new FormGroup({
issue_title:new FormControl(issue_title,[Validators.required]),
issue_date: new FormControl(issue_date,[Validators.required]),
issue_type: new FormControl(issue_type,[Validators.required]),
related_team: new FormControl(related_team),
issue_status:new FormControl(issue_status,[Validators.required]),
issue_desc:new FormControl(issue_desc,[Validators.required]),
issue_updates:new FormControl(issue_updates)
      })
    }

forbiddennames(control:FormControl):{[s:string]:boolean}
{

if(this.issue_titles.indexOf(control.value.toUpperCase())!== -1)
  return {'nameforbid':true}
  else
  return null;
}

OnSubmit()
{

  if(this.edit_trigger)
  {
  this.ts.updateIssue(this.issueSel.issueId,this.issuesForm.value).subscribe(emp_loaded => {

    this.hs.openSnackBar("Issue Details Updated","Success")
    this.rs.navigate(['../teams'],{relativeTo:this.ru})
      },
      errorMessage => {
        this.hs.openSnackBar('errorMessage','Error');

      }
    );
    }
else
{
  this.issuesForm.patchValue({related_team:this.tname})

  this.ts.addIssue(this.issuesForm.value).subscribe(emp_loaded => {

    this.hs.openSnackBar("New Issue Added","Success")
    this.rs.navigate(['../teams'],{relativeTo:this.ru})
      },
      errorMessage => {
        this.hs.openSnackBar('errorMessage','Error');

      }
    );
}
this.ts.issue_titleSelected.next(null);
}

today:Date= new Date();


}
