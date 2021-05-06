import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamService } from '../team.service';
import {map, startWith} from 'rxjs/operators'
import { ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { Team } from '../team.model';
import { TeamseditComponent } from '../teamsedit/teamsedit.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})


export class TeamsListComponent implements OnInit {

 tname;
  
  teamsshow: string[];
  teamsUpdated:Team[]

  constructor(private ts:TeamService, private as: AuthService,private rs:Router,private ru:ActivatedRoute,
    private dialog:MatDialog)   {}
  
  
  add_trigger:boolean

  add_team:string;
ngOnInit() {
  this.as.user.subscribe((data)=>
  {
this.add_team=data.privilege;
  })
  if( this.add_team !== 'Read')
  {
  this.add_trigger=true;
  }

  this.ts.teamsStatus.subscribe((team:Team[])=>{
this.teamsUpdated=team
  })
 
 this.filteredOptions = this.myControl.valueChanges.pipe(
  startWith(''),
  map(value => this._filter(value))
);

}

myControl = new FormControl();

  filteredOptions: Observable<string[]>;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   this.teamsshow=this.ts.getTeamNames();
    return this.teamsshow.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }



Onselect(evt:any)
  {
    this.add_trigger=false;
  this.rs.navigate([evt.option.value], {relativeTo:this.ru})

  }

  OnaddnewTeam()
  {
    
    this.rs.navigate(['new'],{relativeTo: this.ru})
    this.dialog.open(TeamseditComponent);
  }

}
