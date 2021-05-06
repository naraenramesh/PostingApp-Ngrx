import { HttpClient } from '@angular/common/http';
import { Team } from './team.model';
import { TeamService } from './team.service';

export class TeamstorageService
{
    constructor(
        private http: HttpClient,
        private ts: TeamService
      ) {}

    addTeam(postdata:Team)
    {
this.http.post('https://mirror-2ca5a.firebaseio.com/mirror/teams/teams.json', postdata)

    }

}