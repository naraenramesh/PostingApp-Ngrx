import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OncalleditComponent } from '../oncalledit/oncalledit.component';
import { HelperService } from '../../shared/helper.service';
import { TeamService } from '../../teams/team.service';
import { oncall } from '../oncall-model';
import { oncallService } from '../oncall.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-oncalldetail',
  templateUrl: './oncalldetail.component.html',
  styleUrls: ['./oncalldetail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OncalldetailComponent implements OnInit  {

  dataSource: MatTableDataSource<oncall>;
  expandedElement: oncall | null;
  constructor(private as:oncallService,private ts:TeamService,private hs:HelperService,
    private rs:Router,private ru:ActivatedRoute,private dialog:MatDialog) {

  }
  enable_edit=false;
tname:string;
isLoading:boolean
matID:number;
sel_oncall:oncall;
  oncall_list:oncall[];
   oncallForm:FormGroup
   oncallDateStart=null;
   oncallDateEnd=null;
on_list:oncall[]
  async ngOnInit() {

    
    this.rs.routeReuseStrategy.shouldReuseRoute = () => false;
    this.tname= this.ru.snapshot.params.name;
      if(this.tname)
      {        
        this.oncallForm =new FormGroup({
          oncallDateStart:new FormControl(this.oncallDateStart,[Validators.required]),
          oncallDateEnd:new FormControl(this.oncallDateEnd),
          team: new FormControl(this.tname)
        });


      }
      

  }



 columnsToDisplay: string[] = ['oncallDate','oncallPrimary','oncallSecondary']


 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;



async onFindOncall() {
 this.isLoading=true;
 this.oncallForm.patchValue({team:this.tname})
 console.log(this.oncallForm.value)
 
 this.oncall_list=await this.as.getoncall(this.oncallForm.value).toPromise();
 console.log(this.oncall_list)
 this.oncallForm.reset('');
  this.dataSource = new MatTableDataSource(this.oncall_list);

  this.dataSource.paginator = this.paginator;
  console.log("Hi")
 this.dataSource.sort= this.sort
this.isLoading=false;
}
onAddoncall()
{
  this.ts.teamnameSelected.next(this.tname);
  this.dialog.open(OncalleditComponent);
}
Oneditoncall(row:any)
{ this.ts.teamnameSelected.next(this.tname);
  this.as.oncallDateSelected.next(row);
    this.dialog.open(OncalleditComponent);
}


}
