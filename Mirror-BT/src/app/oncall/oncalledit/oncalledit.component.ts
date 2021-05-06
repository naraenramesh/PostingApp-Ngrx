import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Associate } from 'src/app/associates/associates.model';
import { AssociateService } from 'src/app/associates/associates.service';
import { HelperService } from 'src/app/shared/helper.service';
import { TeamService } from 'src/app/teams/team.service';
import { oncall } from '../oncall-model';
import { oncallService } from '../oncall.service';

@Component({
  selector: 'app-oncalledit',
  templateUrl: './oncalledit.component.html',
  styleUrls: ['./oncalledit.component.css']
})
export class OncalleditComponent implements OnInit {

  constructor(private ts:oncallService,private ru:ActivatedRoute,
    private rs:Router,private hs:HelperService, private tservice:TeamService,
    private matdialog: MatDialog, private as: AssociateService) 
  {}
  oncallDates:Date[];
  oname:string;
  tname:string;
  oncallSel:oncall;
  oncallForm:FormGroup;
  associatesshow: string[];
  patch_associate:Associate;
  edit_trigger:boolean=false;
  ngOnInit() {
    this.edit_trigger=false;
this.tservice.teamnameSelected.subscribe((name:string)=>{
  this.tname=name;
  console.log("ttname is" + name)
  })
    this.ts.oncallDateSelected.subscribe((sel_issue:oncall)=>{
this.oncallSel=sel_issue;
})
if(this.oncallSel)
{
this.edit_trigger=true;
}
this.initForm();

this.filteredOptions1 = this.myControl1.valueChanges.pipe(
  startWith(''),
  map(value => this._filter(value))
);

this.filteredOptions2 = this.myControl2.valueChanges.pipe(
  startWith(''),
  map(value => this._filter(value))
);
  }
 
   initForm()
  {
let  oncallPrimaryContact='';
let  oncallPrimaryEmail='';
let  oncallDate=new Date('');
let  oncallSecondary='';
let  related_team='';
let  oncallPrimary='';
let  oncallSecondaryEmail='';
let  oncallSecondaryContact='';
    
if(this.edit_trigger)
{
     oncallDate=this.oncallSel.oncallDate;
    oncallPrimaryContact=this.oncallSel.oncallPrimaryContact;
    oncallSecondary=this.oncallSel.oncallSecondary;
    oncallSecondaryContact=this.oncallSel.oncallSecondaryContact;
	related_team=this.oncallSel.related_team;
    oncallPrimary=this.oncallSel.oncallPrimary;
 oncallPrimaryEmail=this.oncallSel.oncallPrimaryEmail;
    oncallSecondaryEmail=this.oncallSel.oncallSecondaryEmail;
 
    this.oncallDates=this.ts.getExlcudeoncallNames(name); 
  }

  this.oncallDates=this.ts.getExlcudeoncallNames(); 

  this.oncallForm =new FormGroup({
oncallDate:new FormControl(oncallDate,[Validators.required]),
oncallPrimaryContact: new FormControl(oncallPrimaryContact,[Validators.required]),
oncallSecondary: new FormControl(oncallSecondary,[Validators.required]),
related_team: new FormControl(related_team),
oncallPrimary:new FormControl(oncallPrimary,[Validators.required]),
oncallPrimaryEmail:new FormControl(oncallPrimaryEmail,[Validators.required]),
oncallSecondaryEmail:new FormControl(oncallSecondaryEmail,[Validators.required]),  
oncallSecondaryContact:new FormControl(oncallSecondaryContact,[Validators.required]),
      })
    }
 
forbiddennames(control:FormControl):{[s:string]:boolean}
{ 
 
if(this.oncallDates.indexOf(control.value.toUpperCase())!== -1)
  return {'nameforbid':true}
  else
  return null;
}

OnSubmit()
{

  if(this.edit_trigger)
  {
  this.ts.updateoncall(this.oncallSel.oncallId,this.oncallForm.value);
  
this.rs.navigate(['../'],{relativeTo:this.ru})
this.hs.openSnackBar("Oncall Details Updated","Success")
}
else
{
  console.log("Tname"+ this.tname);

  this.oncallForm.patchValue({related_team:this.tname})
console.log(this.oncallForm.value)
  this.ts.addoncall(this.oncallForm.value);
  this.rs.navigate(['../'],{relativeTo:this.ru})
this.hs.openSnackBar("New Oncall Details Added","Success")
}
this.ts.oncallDateSelected.next(null);
}

today:Date= new Date();

myControl1 = new FormControl();
filteredOptions1: Observable<string[]>;
myControl2 = new FormControl();
filteredOptions2: Observable<string[]>;


private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
 this.associatesshow=this.as.getTeamAssociates(this.tname).map(a=>a.empname);
 
  return this.associatesshow.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
}

OnselectPrimary(evt:any)
{
  console.log(evt.option.value);


  this.patch_associate=this.as.getAssociate(evt.option.value)

  this.oncallForm.patchValue({related_team:this.tname,
    oncallPrimary:evt.option.value,
    oncallPrimaryEmail: this.patch_associate.empcogemailid,
oncallPrimaryContact:this.patch_associate.empcontactno},
  )
  console.log(this.oncallForm.value)
this.initForm();
 
}


OnselectSecondary(evt:any)
{
  this.patch_associate=this.as.getAssociate(evt.option.value) 
  this.oncallForm.patchValue({related_team:this.tname,
    oncallSecondaryEmail: this.patch_associate.empcogemailid,
  oncallSecondaryContact:this.patch_associate.empcontactno});
  console.log(evt.option.value);
  this.initForm();
}


}
