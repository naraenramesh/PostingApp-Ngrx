import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IssuesEditComponent } from '../issues-edit/issues-edit.component';
import { HelperService } from '../shared/helper.service';
import { TeamService } from '../teams/team.service';
import { Issues } from './issues_model';
import { IssuesService } from './issues_service';

@Component({
  selector: 'app-issues-collection',
  templateUrl: './issues-collection.component.html',
  styleUrls: ['./issues-collection.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IssuesCollectionComponent implements OnInit {

  constructor(private as:IssuesService,private ts:TeamService,private hs:HelperService,
    private rs:Router,private ru:ActivatedRoute,private dialog:MatDialog) { 
    
  }
  enable_edit=false;
tname:string;
isLoading:boolean
matID:number;
sel_issue:Issues;
  issues_list:Issues[];
  ngOnInit() {
    
    this.ru.params.subscribe((ps:Params)=>{
      if(ps['name'])
      {
        
        this.tname=ps['name'];
        this.as.getIssues(this.tname).subscribe();
        }
      })

    this.as.issuesStatus.subscribe((iss:Issues[])=>{
      this.issues_list=iss;
      this.dataSource = new MatTableDataSource(this.issues_list);
  
    });
        
    
  }
 columnsToDisplay: string[] = ['issueId','issue_title','issue_date','issue_type',
 'issue_status'];
  dataSource: MatTableDataSource<Issues>;
  expandedElement: Issues | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

onAddIssue()
{
  this.ts.teamnameSelected.next(this.tname);
  this.dialog.open(IssuesEditComponent);
}  
OneditIssue()
{
  console.log("ISSID" + this.matID);
  this.ts.teamnameSelected.next(this.tname);
   this.sel_issue= this.issues_list[this.matID]
  this.as.issue_titleSelected.next(this.sel_issue);
    this.dialog.open(IssuesEditComponent);
}

OnSaveID(id:number)
{
  this.matID=id;
  this.enable_edit=true;
}
OndeleteIssue()
{

  this.as.deleteIssue(this.issues_list[this.matID].issueId);
this.rs.navigate(['../../'],{relativeTo:this.ru})
this.hs.openSnackBar("Issue Removed","Success")
}
}
