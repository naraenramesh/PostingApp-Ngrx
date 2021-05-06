import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Team } from './team.model';

@Injectable()
export class TeamService{
  private  teams: Team[]
 //= [{teamname:'Nexus',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'}] //{teamname:'BSM',teamdesc:'Postpay',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'Provident',teamdesc:'Provisioning team which takes care of all type of product for wholesale and retail customers',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'IVR',teamdesc:'Customer care agents',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'NGSP',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'BESL',teamdesc:'Postpay',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'Toolkit',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'Domino',teamdesc:'Postay',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'Text service',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'XTC',teamdesc:'Postpay',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'CBS',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'EFB',teamdesc:'Postpay',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'Topics',teamdesc:'Prepay',teamqueue:'TPEECOGNEXUS',teammailId:'cognizantteam@cognizant.com'},
    //{teamname:'DBA',teamdesc:'Postpay',teamqueue:'TPEECOGBSM',teammailId:'cognizantteam@cognizant.com'},
  

    ind;
teamsStatus=new BehaviorSubject<Team[]>([]);
teamnameSelected= new BehaviorSubject<string>('');

constructor(private http:HttpClient){}

getTeams()
{
    return this.http.get<any>('http://localhost:3000/api/teams')
    .pipe(map((teamdata)=>
    {
   return  teamdata.map((info)=>
   {
    return { 
      id:info._id,
    teamname:info.teamname,
  teamdesc:info.teamdesc,
  teamqueue:info.teamqueue,
  teammailId:info.teammailId
}
   })  
    }),tap(teams_loaded => {
      this.teams=teams_loaded;
      console.log(this.teams)
      this.teamsStatus.next(this.teams.slice())
      })
    )
  }
  
getTeamNames()
{
//console.log(this.teams)
return this.teams.map(tname =>tname.teamname)
}

getTeam(name1:string)
{
return this.teams.find(name=>name.teamname===name1);
}


getExlcudeTeamNames(name1?:string)
{
    if(name1)
    {
      this.ind=this.teams.indexOf(this.teams.find(name=>name.teamname===name1))
 //this.teams.splice(this.ind,1);
}
return this.teams.map(tname =>tname.teamname.toUpperCase())

}


deleteTeam(name1:string)
{
  this.http.delete("http://localhost:3000/api/teams/" + name1)
  .subscribe();
    this.ind =this.teams.indexOf(this.teams.find(name=>name.teamname===name1))
    this.teams.splice(this.ind,1);
this.teamsStatus.next(this.teams.slice())
}

updateTeam(team:String,teamContent:Team)
{
     this.ind =this.teams.indexOf(this.teams.find(name=>name.teamname===team))
    this.teams[this.ind]=teamContent;
    console.log(teamContent)
this.teamsStatus.next(this.teams.slice());
this.http.put('http://localhost:3000/api/teams/'+ team ,teamContent)
.subscribe();
}
addTeam(team:Team)
{
       
this.http.post<{teamId:string}>('http://localhost:3000/api/teams',team)
.subscribe(response => {
 
const id=response.teamId;
console.log(id)
team.id=id;
console.log(team);
this.teams.push(team);
    this.teamsStatus.next(this.teams.slice());
 
});

}
  

}