import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/shared/helper.service';
import { Team } from '../team.model';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-teamsedit',
  templateUrl: './teamsedit.component.html',
  styleUrls: ['./teamsedit.component.css'],
})
export class TeamseditComponent implements OnInit {
  constructor(private ts:TeamService,private ru:ActivatedRoute,
    private rs:Router,private hs:HelperService) 
  {}
  teamnames:string[];
  tname:string;
  teamSel:Team;
  teamForm:FormGroup;
  edit_trigger:boolean=false;
  ngOnInit() {
    this.edit_trigger=false;

    this.ts.teamnameSelected.subscribe((name:string)=>{
this.tname=name;
})
if(this.tname)
{
this.edit_trigger=true;
}
this.initForm();

  }
 
   initForm()
  {
    let name='';
    let mail='';
    let desc='';
    let queue='';
if(this.edit_trigger)
{
    this.teamSel = this.ts.getTeam(this.tname);
     name=this.teamSel.teamname;
    mail=this.teamSel.teammailId;
    desc=this.teamSel.teamdesc;
    queue=this.teamSel.teamqueue;
 
    this.teamnames=this.ts.getExlcudeTeamNames(name); 
  }

  this.teamnames=this.ts.getExlcudeTeamNames(); 

  this.teamForm =new FormGroup({
teamname:new FormControl(name,[Validators.required,this.forbiddennames.bind(this)]),
teammailId: new FormControl(mail,[Validators.required, Validators.email]),
teamdesc: new FormControl(desc),
teamqueue:new FormControl(queue)    
      })

         
    }
 
forbiddennames(control:FormControl):{[s:string]:boolean}
{ 
 
if(this.teamnames.indexOf(control.value.toUpperCase())!== -1)
  return {'nameforbid':true}
  else
  return null;
}

OnSubmit()
{

  if(this.edit_trigger)
  {
  this.ts.updateTeam(this.tname,this.teamForm.value);
  
this.rs.navigate(['../'],{relativeTo:this.ru})
this.hs.openSnackBar("Team Details Updated","Success")
}
else
{
  this.ts.addTeam(this.teamForm.value);
  this.rs.navigate(['../'],{relativeTo:this.ru})
this.hs.openSnackBar("New Team Details Added","Success")
}
this.ts.teamnameSelected.next('');
}




}