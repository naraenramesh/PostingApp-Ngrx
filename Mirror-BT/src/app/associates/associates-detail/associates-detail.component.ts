import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { HelperService } from 'src/app/shared/helper.service';
import { AssociatesEditComponent } from '../associates-edit/associates-edit.component';
import { Associate } from '../associates.model';
import { AssociateService } from '../associates.service';

@Component({
  selector: 'app-associates-detail',
  templateUrl: './associates-detail.component.html',
  styleUrls: ['./associates-detail.component.css']
})
export class AssociatesDetailComponent implements OnInit {

  constructor(private ts:AssociateService,private rs:ActivatedRoute,
    private as: AuthService,private ru:Router,private dialog:MatDialog,private hs:HelperService) { }

aname:string;
SelectedAssociate:Associate

edit_trigger:boolean

edit_associate:string;
  ngOnInit() {
this.rs.params.subscribe((ps:Params)=>{
if(ps['name'])
{
  this.aname=ps['name'];
this.SelectedAssociate=this.ts.getAssociate(this.aname);
console.log(this.SelectedAssociate)
}
})
this.as.user.subscribe((data)=>
  {
    if(data)
    {
this.edit_associate=data.privilege;
    }
  })
  if( this.edit_associate !== 'Read')
  {
  this.edit_trigger=true;
  }


  }

OneditAssociate()
{
  this.ts.associatenameSelected.next(this.aname);
    this.dialog.open(AssociatesEditComponent);
}

OndeleteAssociate()
{
  this.ts.deleteAssociate(this.aname).subscribe(resData => {


    this.hs.openSnackBar("Associate Details Deleted","Success")
    this.ru.navigate(['../../associates'],{relativeTo:this.rs})
      },
      errorMessage => {
        this.hs.openSnackBar(errorMessage,'Error');

      }
    );
}

}
