import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-oncalldetail',
  templateUrl: './oncalldetail.component.html',
  styleUrls: ['./oncalldetail.component.css']
})
export class OncalldetailComponent implements OnInit {


  constructor(private as:oncallService,private ts:TeamService,private hs:HelperService,
    private rs:Router,private ru:ActivatedRoute,private dialog:MatDialog) { 
    
  }
  enable_edit=false;
tname:string;
isLoading:boolean
matID:number;
sel_oncall:oncall;
  oncall_list:oncall[];
  ngOnInit() {
    this.ru.params.subscribe((ps:Params)=>{
      if(ps['name'])
      {
        
        this.tname=ps['name'];
 //       this.as.getoncall(this.tname).subscribe();
        }
      })

    //this.as.oncallStatus.subscribe((iss:oncall[])=>{
      //this.oncall_list=iss;
      this.oncall_list= []
      this.dataSource = new MatTableDataSource(this.oncall_list);
  
    //});
        
    
  }
 columnsToDisplay: string[] = ['oncallDate','oncallPrimary','oncallSecondary']
  dataSource: MatTableDataSource<oncall>;
  expandedElement: oncall | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


onAddoncall()
{
  this.ts.teamnameSelected.next(this.tname);
  this.dialog.open(OncalleditComponent);
}  
Oneditoncall()
{
  console.log("ISSID" + this.matID);
  this.ts.teamnameSelected.next(this.tname);
   this.sel_oncall= this.oncall_list[this.matID]
  this.as.oncallSelected.next(this.sel_oncall);
    this.dialog.open(OncalleditComponent);
}

OnSaveID(id:number)
{
  this.matID=id;
  this.enable_edit=true;
}
}
