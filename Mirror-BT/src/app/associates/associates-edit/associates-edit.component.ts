import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HelperService } from 'src/app/shared/helper.service';
import { Associate } from '../associates.model';
import { AssociateService } from '../associates.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { TeamService } from 'src/app/teams/team.service';

@Component({
  selector: 'app-associates-edit',
  templateUrl: './associates-edit.component.html',
  styleUrls: ['./associates-edit.component.css']
})
export class AssociatesEditComponent implements OnInit {
  constructor(private ts:AssociateService,private teamservice:TeamService,private ru:ActivatedRoute,
    private rs:Router,private hs:HelperService) 
  {}
  empnames:string[];
  empname:string;
  empSel:Associate;
  associateForm:FormGroup;
  edit_trigger:boolean=false;
emplist:string[];
filteredOptions: Observable<string[]>;
myControl = new FormControl();

ngOnInit() {
   
    this.edit_trigger=false;

    this.ts.associatenameSelected.subscribe((name:string)=>{
this.empname=name;
console.log(this.empname)
})
if(this.empname)
{
this.edit_trigger=true;
}
this.initForm();


this.filteredOptions = this.myControl.valueChanges.pipe(
  startWith(''),
  map(value => this._filter(value))
);
}
 
   initForm()
  {
    let name='';
    let cogmail='';
    let btmail='';
    let UIN='';
	let contact='';
	let teams=[];
	
if(this.edit_trigger)
{
    this.empSel = this.ts.getAssociate(this.empname);
     name=this.empSel.empname;
    cogmail=this.empSel.empcogemailid
    btmail=this.empSel.empBTemailid
    contact=this.empSel.empcontactno;
    UIN=this.empSel.empUIN;
    teams=this.empSel.empTeams;
 
    this.empnames=this.ts.getExlcudeAssociateNames(name); 
  }

  this.empnames=this.ts.getExlcudeAssociateNames(); 

  this.associateForm =new FormGroup({
empname:new FormControl(name,[Validators.required,this.forbiddennames.bind(this)]),
empcogemailid: new FormControl(cogmail,[Validators.required, Validators.email]),
empBTemailid: new FormControl(btmail,[Validators.required,Validators.email]),
empcontactno:new FormControl(contact,[Validators.required,Validators.maxLength(10)]),
empUIN:new FormControl(UIN,[Validators.required]),
empTeams:new FormControl(teams)    
      })
       
    }
 
forbiddennames(control:FormControl):{[s:string]:boolean}
{ 
 
if(this.empname.indexOf(control.value.toUpperCase())!== -1)
  return {'nameforbid':true}
  else
  return null;
}

OnSubmit()
{
this.associateForm.patchValue({empTeams:this.teams})
  console.log(this.associateForm.value)  
  if(this.edit_trigger)
  {
  this.ts.updateAssociate(this.empname,this.associateForm.value);
  
this.rs.navigate(['../'],{relativeTo:this.ru})
this.hs.openSnackBar("Associate Details Updated","Success")
}
else
{
  this.ts.addAssociate(this.associateForm.value);
  this.rs.navigate(['../'],{relativeTo:this.ru})
this.hs.openSnackBar("New Associate Added","Success")
}
this.ts.associatenameSelected.next('');
}

visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  teamCtrl = new FormControl();
  teams: string[] = ['Nexus'];
  teamsshow: string[];

  @ViewChild('teamInput') teamInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   this.teamsshow=this.teamservice.getTeamNames();
   console.log(this.teamsshow)
    return this.teamsshow.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our team
    if ((value || '').trim()) {
      this.teams.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.teamCtrl.setValue(null);
  }

  remove(team: string): void {
    const index = this.teams.indexOf(team);

    if (index >= 0) {
      this.teams.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.teams.push(event.option.viewValue);
    this.teamInput.nativeElement.value = '';
    this.teamCtrl.setValue(null);
  }
}
