import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../associates/associates.service';
import { TeamService } from '../teams/team.service';

@Component({
  selector: 'app-start-mirror',
  templateUrl: './start-mirror.component.html',
  styleUrls: ['./start-mirror.component.css']
})
export class StartMirrorComponent implements OnInit {

  constructor(private ts:TeamService,private as:AssociateService) { }

  ngOnInit(){
    this.ts.getTeams().subscribe();
    this.as.getAssociates().subscribe();
  }

}
