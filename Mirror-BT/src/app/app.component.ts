import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { TeamService } from './teams/team.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor( private ts:TeamService, private as:AuthService) {}

  ngOnInit() {
    this.as.autoLogin();
  
     }
}
