import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule} from '@angular/material/paginator'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { TeamsComponent } from './teams/teams.component';
import { TeamsListComponent } from './teams/teams-list/teams-list.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AssociatesComponent } from './associates/associates.component';
import { AssociatesListComponent } from './associates/associates-list/associates-list.component';
import { AssociatesDetailComponent } from './associates/associates-detail/associates-detail.component';
import { AssociatesEditComponent } from './associates/associates-edit/associates-edit.component';
import { TeammembersComponent } from './teammembers/teammembers.component';
import { TeamseditComponent } from './teams/teamsedit/teamsedit.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TeamService } from './teams/team.service';
import { HelperService } from './shared/helper.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthService } from './authentication/auth.service';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { AuthGuard } from './authentication/auth.guard';
import { AuthInterceptorService } from './authentication/auth_interceptor';
import { StartMirrorComponent } from './start-mirror/start-mirror.component';
import { TeamResolverService } from './teams/team_resolver';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { IssuesCollectionComponent } from './issues-collection/issues-collection.component';
import { IssuesEditComponent } from './issues-edit/issues-edit.component';
import { MatNativeDateModule } from '@angular/material/core';
import { OncalldetailComponent } from './oncall/oncalldetail/oncalldetail.component';
import { OncalleditComponent } from './oncall/oncalledit/oncalledit.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

const approute: Routes =[
  {path: '', redirectTo: '/begin', pathMatch:'full'},
  {path: 'begin', component: StartMirrorComponent,canActivate:[AuthGuard],resolve:[TeamResolverService],
  children: [
    {path: 'UAM', component: UserManagementComponent},
    {path: 'associates', component: AssociatesComponent,children:[
      {path: 'new', redirectTo: ''}
    ,{path: ':name', component: AssociatesDetailComponent,
    }
    ]},
    
  {path: 'teams', component: TeamsComponent,
children:[
  {path: 'new', redirectTo: ''}
,{path: ':name', component: TeamDetailComponent,
}
]},
]},
 {path: 'auth', component: AuthenticationComponent}
]

@NgModule({
  declarations: [DropdownDirective,AppComponent, HeaderComponent, 
    TeamsComponent, TeamsListComponent, TeamDetailComponent, AssociatesComponent,
     AssociatesListComponent, AssociatesDetailComponent, AssociatesEditComponent,
      TeammembersComponent, TeamseditComponent, AuthenticationComponent,
       LoadingComponent, AlertComponent,PlaceholderDirective, StartMirrorComponent, UserManagementComponent, IssuesCollectionComponent, IssuesEditComponent, OncalldetailComponent, OncalleditComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(approute),
    MatPaginatorModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatDatepickerModule,
   MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatNativeDateModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
ReactiveFormsModule,
BrowserAnimationsModule,
SatDatepickerModule, 
SatNativeDateModule
  ],
  bootstrap: [AppComponent],

  providers: [TeamService, AuthService,AuthGuard,HelperService,MatDatepicker,TeamResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
]
})
export class AppModule {}
