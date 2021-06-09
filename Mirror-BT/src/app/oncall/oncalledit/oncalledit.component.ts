import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { Associate } from 'src/app/associates/associates.model';
import { AssociateService } from 'src/app/associates/associates.service';
import { HelperService } from 'src/app/shared/helper.service';
import { TeamService } from 'src/app/teams/team.service';
import { oncall } from '../oncall-model';
import { oncallService } from '../oncall.service';

@Component({
  selector: 'app-oncalledit',
  templateUrl: './oncalledit.component.html',
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: OncalleditComponent
  }],
  styleUrls: ['./oncalledit.component.css']
})

@Injectable()
export class OncalleditComponent<D> implements OnInit,MatDateRangeSelectionStrategy<D> {


  constructor(private ts:oncallService,private ru:ActivatedRoute,
    private rs:Router,private hs:HelperService, private tservice:TeamService,
    private as: AssociateService,private _dateAdapter: DateAdapter<D>)
  {
  }
  selectionFinished(date: D, currentRange: DateRange<D>) {
      let { start, end } = currentRange;
      if (start == null || (start && end)) {
          start = date;
          end = null;
      } else if (end == null) {
          const maxDate = this._dateAdapter.addCalendarDays(start, 7);
          end = date ? date > maxDate ? maxDate : date : null;
      }

      return new DateRange<D>(start, end);
  }

  createPreview(activeDate: D | null, currentRange: DateRange<D>): DateRange<D> {
      if (currentRange.start && !currentRange.end) {
          const maxDate = this._dateAdapter.addCalendarDays(currentRange.start, 7);
          const rangeEnd = activeDate ? activeDate > maxDate ? maxDate : activeDate : null;
          return new DateRange(currentRange.start, rangeEnd);
      }

      return new DateRange<D>(null, null); }
      selected:string;
      cv:string;
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
  this.associatesshow=this.as.getTeamAssociates(this.tname).map(a=>a.empname);
  //console.log("ttname is" + name)
  })
    this.ts.oncallDateSelected.subscribe((sel_oncall:oncall)=>{
this.oncallSel=sel_oncall;
})
if(this.oncallSel)
{
this.edit_trigger=true;
}
this.initForm();



  }

   initForm()
  {
let  oncallPrimaryContact='';
let  oncallPrimaryEmail='';
let  oncallDateStart=new Date('');
let  oncallDateEnd=new Date('');
let  oncallSecondary='';
let  related_team='';
let  oncallPrimary='';
let  oncallSecondaryEmail='';
let  oncallSecondaryContact='';

if(this.edit_trigger)
{
     oncallDateStart=this.oncallSel.oncallDate;
     oncallDateEnd=this.oncallSel.oncallDate;
    oncallPrimaryContact=this.oncallSel.oncallPrimaryContact;
    oncallSecondary=this.oncallSel.oncallSecondary;
    oncallSecondaryContact=this.oncallSel.oncallSecondaryContact;
	related_team=this.oncallSel.related_team;
    oncallPrimary=this.oncallSel.oncallPrimary;
 oncallPrimaryEmail=this.oncallSel.oncallPrimaryEmail;
    oncallSecondaryEmail=this.oncallSel.oncallSecondaryEmail;

    this.oncallDates=this.ts.getExlcudeoncallNames();
  }

  this.oncallDates=this.ts.getExlcudeoncallNames();

  this.oncallForm =new FormGroup({
oncallDateStart:new FormControl(oncallDateStart,[Validators.required]),
oncallDateEnd:new FormControl(oncallDateEnd),
oncallPrimaryContact: new FormControl(oncallPrimaryContact,[Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]*')]),
oncallSecondary: new FormControl(oncallSecondary,[Validators.required]),
related_team: new FormControl(related_team),
oncallPrimary:new FormControl(oncallPrimary,[Validators.required]),
oncallPrimaryEmail:new FormControl(oncallPrimaryEmail,[Validators.required,Validators.email]),
oncallSecondaryEmail:new FormControl(oncallSecondaryEmail,[Validators.required,Validators.email]),
oncallSecondaryContact:new FormControl(oncallSecondaryContact,[Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]*')]),
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
  this.oncallForm.patchValue({related_team:this.tname});
  if(this.edit_trigger)
  {

console.log(this.oncallForm.value)
  this.ts.updateoncall(this.oncallForm.value).subscribe(onc_loaded => {

    this.hs.openSnackBar("Oncall Details Updated","Success")
      },
      errorMessage => {
        this.rs.navigate(['../teams'],{relativeTo:this.ru})
        this.hs.openSnackBar("Failed to update Oncall Details","Success")
      
})
  }
else
{

  this.ts.addoncall(this.oncallForm.value).subscribe(onc_loaded => {

    this.hs.openSnackBar("Oncall Details Added","Success")
      },
      errorMessage => {
        this.rs.navigate(['../teams'],{relativeTo:this.ru})
        this.hs.openSnackBar("Failed to add Oncall Details","Success")
      
})
}
this.ts.oncallDateSelected.next(null);
}

today:Date= new Date();


OnselectPrimary(evt:any)
{
this.cv=evt.value;
 this.patch_associate=this.as.getAssociate(evt.value)
 this.oncallForm.patchValue({related_team:this.tname,
    oncallPrimary:evt.value,
    oncallPrimaryEmail: this.patch_associate.empcogemailid,
oncallPrimaryContact:this.patch_associate.empcontactno},
  )


}

pv:string;

OnselectSecondary(evt:any)
{
this.pv=evt.value;
  this.patch_associate=this.as.getAssociate(evt.value)
  this.oncallForm.patchValue({related_team:this.tname,
    oncallSecondaryEmail: this.patch_associate.empcogemailid,
  oncallSecondaryContact:this.patch_associate.empcontactno});
}


}
