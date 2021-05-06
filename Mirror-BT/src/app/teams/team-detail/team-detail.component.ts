import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Team } from '../team.model';
import { TeamService } from '../team.service';
import {MatDialog} from '@angular/material/dialog';
import { TeamseditComponent } from '../teamsedit/teamsedit.component';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  constructor(private ts:TeamService,private rs:ActivatedRoute,
    private as: AuthService,private ru:Router,private dialog:MatDialog) { }

tname:string;
SelectedTeam:Team

edit_trigger:boolean

edit_team:string;
  ngOnInit() {
this.rs.params.subscribe((ps:Params)=>{
if(ps['name'])
{
  this.tname=ps['name'];
this.SelectedTeam=this.ts.getTeam(this.tname);
}
})
this.as.user.subscribe((data)=>
  {
this.edit_team=data.privilege;

  })
  if( this.edit_team !== 'Read')
  {
  this.edit_trigger=true;
  }


  }

OneditTeam()
{if(!this.edit_trigger)

{
  this.ts.teamnameSelected.next(this.tname);
    this.dialog.open(TeamseditComponent);
}
}

OndeleteTeam()
{
  this.ts.deleteTeam(this.tname);
this.ru.navigate(['../../'],{relativeTo:this.rs})
}
  }



