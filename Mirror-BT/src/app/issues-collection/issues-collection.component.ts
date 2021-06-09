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
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })), state('expanded', style({ height: '*' })), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')) ])],
})
export class IssuesCollectionComponent implements OnInit {

  constructor(private as:IssuesService,private ts:TeamService,private hs:HelperService,
    private rs:Router,private ru:ActivatedRoute,private dialog:MatDialog) {
      this.dataSource = new MatTableDataSource(this.issues_list);

  }
  enable_edit=false;
tname:string;
isLoading:boolean
matID:String;
sel_issue:Issues;
  issues_list:Issues[];
 async ngOnInit() {
  this.ru.params.subscribe((ps:Params)=>{
    if(ps['name'])
    {

      this.tname=ps['name'];}
    });
    this.issues_list= await this.as.getIssues(this.tname).toPromise();

      this.dataSource = new MatTableDataSource(this.issues_list);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort= this.sort

    }

 columnsToDisplay: string[] = ['issueId','issue_title','issue_date','issue_type','issue_status'];
  dataSource: MatTableDataSource<Issues>;
  expandedElement: Issues | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


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
OneditIssue(row:any)
{
  this.ts.teamnameSelected.next(this.tname);
  this.as.issue_titleSelected.next(row);
    this.dialog.open(IssuesEditComponent);
}

OndeleteIssue(row:any)
{

  this.as.deleteIssue(row.issueId).subscribe(emp_loaded => {

    this.hs.openSnackBar("Issue Deleted","Success")
    this.rs.navigate(['../'],{relativeTo:this.ru})
      },
      errorMessage => {
        this.hs.openSnackBar('errorMessage','Error');

      }
    );

}
}
