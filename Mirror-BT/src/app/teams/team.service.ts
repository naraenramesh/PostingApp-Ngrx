import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    return this.http.get<any>('https://mirrorview.herokuapp.com/api/teams')
    .pipe(catchError((em:HttpErrorResponse)=>{
      let errorMessage=em.error.error
      return throwError(errorMessage);
    }),map((teamdata)=>
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
      //console.log(this.teams)
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



deleteTeam(name1:string)
{
 return this.http.delete<any>("https://mirrorview.herokuapp.com/api/teams/" + name1)
  .pipe(catchError((em:HttpErrorResponse)=>{
    let errorMessage=em.error.error
    return throwError(errorMessage);
  }),map((teamdata)=>
  {
 return  teamdata.map((info)=>
 {
  //console.log(info)
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
    //console.log(this.teams)
    this.teamsStatus.next(this.teams.slice())
    })
  )
}

updateTeam(team:String,teamContent:Team)
{
return this.http.put<any>('https://mirrorview.herokuapp.com/api/teams/'+ team ,teamContent)
.pipe(catchError((em:HttpErrorResponse)=>{
  let errorMessage=em.error.error
  return throwError(errorMessage);
}),map((info)=>
{
  //console.log("g")
  //console.log(info)
return {
  id:info._id,
teamname:info.teamname,
teamdesc:info.teamdesc,
teamqueue:info.teamqueue,
teammailId:info.teammailId
}
}),tap(team_loaded => {
  this.teams[this.teams.indexOf(this.teams.find(name=>name.teamname === teamContent.teamname))]=team_loaded;
  //console.log(team)
  //console.log(this.teams)
  this.teamsStatus.next(this.teams.slice())
  })
)
}
addTeam(team:Team)
{

return this.http.post<any>('https://mirrorview.herokuapp.com/api/teams',team)
.pipe(catchError((em:HttpErrorResponse)=>{
  let errorMessage=em.error.error
  return throwError(errorMessage);
}),map((info)=>
{
return {
  id:info._id,
teamname:info.teamname,
teamdesc:info.teamdesc,
teamqueue:info.teamqueue,
teammailId:info.teammailId
}
}),tap(team_loaded => {
  this.teams.push(team_loaded);
  //console.log(this.teams)
  this.teamsStatus.next(this.teams.slice())
  })
)
}


}
