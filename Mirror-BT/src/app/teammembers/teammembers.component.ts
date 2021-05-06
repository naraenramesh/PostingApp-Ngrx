import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Associate } from '../associates/associates.model';
import { AssociateService } from '../associates/associates.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-teammembers',
  templateUrl: './teammembers.component.html',
  styleUrls: ['./teammembers.component.css']
})
export class TeammembersComponent implements OnInit {

  constructor(private as:AssociateService,private rs:ActivatedRoute) { 
    
  }
tname:string;
  teammembers:Associate[];
  ngOnInit() {
    this.rs.params.subscribe((ps:Params)=>{
      if(ps['name'])
      {
        
        this.tname=ps['name'];
        console.log(this.tname)
        this.teammembers=this.as.getTeamAssociates(this.tname);
        this.dataSource = new MatTableDataSource(this.teammembers);
      }
      })
  }
 displayedColumns: string[] = ['empname', 'empcogemailid', 'empBTemailid', 'empUIN','empcontactno'];
  dataSource: MatTableDataSource<Associate>;

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
}

