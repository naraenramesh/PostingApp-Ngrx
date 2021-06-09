import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/authentication/auth.service';
import { HelperService } from 'src/app/shared/helper.service';
import { AssociatesEditComponent } from '../associates-edit/associates-edit.component';
import { Associate } from '../associates.model';
import { AssociateService } from '../associates.service';

@Component({
  selector: 'app-associates-list',
  templateUrl: './associates-list.component.html',
  styleUrls: ['./associates-list.component.css']
})
export class AssociatesListComponent implements OnInit {

  constructor(private as:AuthService,private ts:AssociateService,
    private hs:HelperService,private ru:ActivatedRoute,private rs:Router,
    private dialog:MatDialog)
   { }

   add_associate:string;
add_trigger:boolean;
associatesUpdated:Associate[];
associatesshow:string[];

  ngOnInit(): void {
    this.rs.routeReuseStrategy.shouldReuseRoute = () => false;
this.ts.associatenameSelected.next('');
    this.as.user.subscribe((data)=>
    {
      if(data)
      {
  this.add_associate=data.privilege;
    }})
    if( this.add_associate !== 'Read')
    {
    this.add_trigger=true;
    }

    this.ts.associatesStatus.subscribe((associates:Associate[])=>{
  this.associatesUpdated=associates
    })

   this.filteredOptions=
    this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  )

  }

  myControl = new FormControl();

    filteredOptions: Observable<string[]>;

     private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
     this.associatesshow=this.ts.getAssociateNames();
      return this.associatesshow.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }



  Onselect(evt:any)
    {
      this.add_trigger=false;
      this.rs.navigate([evt.option.value], {relativeTo:this.ru});
      this.ts.associatenameSelected.next(evt.option.value);

this.myControl.reset('');
//this.myControl.get(evt.option.value).reset();
    }

    OnaddnewAssociate()
    {

      this.dialog.open(AssociatesEditComponent);
    }

  }
