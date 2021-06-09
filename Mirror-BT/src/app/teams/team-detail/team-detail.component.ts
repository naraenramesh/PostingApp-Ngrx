import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Team } from '../team.model';
import { TeamService } from '../team.service';
import {MatDialog} from '@angular/material/dialog';
import { TeamseditComponent } from '../teamsedit/teamsedit.component';
import { AuthService } from 'src/app/authentication/auth.service';
import { HelperService } from 'src/app/shared/helper.service';


@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TeamDetailComponent implements OnInit {

  constructor(private ts:TeamService,private rs:ActivatedRoute,
    private as: AuthService,private ru:Router,private dialog:MatDialog, private hs:HelperService) { }


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
    if(data)
    {
this.edit_team=data.privilege;
    }
  })
  if( this.edit_team !== 'Read')
  {
  this.edit_trigger=true;
  }


  }

OneditTeam()
{
  this.ts.teamnameSelected.next(this.tname);
    this.dialog.open(TeamseditComponent);

}

OndeleteTeam()
{
  this.ts.deleteTeam(this.tname).subscribe(emp_loaded => {

    this.hs.openSnackBar("Team Details Deleted","Success")
    this.ru.navigate(['../../teams'],{relativeTo:this.rs})
      },
      errorMessage => {
        this.hs.openSnackBar('errorMessage','Error');

      }
    );
}
  }



