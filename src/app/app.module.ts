import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AddUserComponent } from './ui/user/add-user/add-user.component';
import { TaskService } from './services/task.service';
import { ApiService } from './shared/services/api.service';
import { ScrollTopDirective } from './directives/scrolltop.directive';
import { UserService } from './services/user.service';
import { UserComponent } from './ui/user/user.component';
import { AddProjectComponent } from './ui/project/add-project/add-project.component';
import { ProjectComponent } from './ui/project/project.component';
import { ProjectService } from './services/project.service';
import { AddTaskComponent } from './ui/task/add-task/add-task.component';
import { ViewTaskComponent } from './ui/task/view-task/view-task.component';
import { ModalLookupComponent } from './shared/components/modal-lookup/modal-lookup.component';

const appRoutes: Routes = [
  { path: '', redirectTo: "/user", pathMatch: "full" },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'updatetask/:id', component: AddTaskComponent },
  { path: 'viewtask', component: ViewTaskComponent }  ,
  { path: 'viewtask/:id', component: ViewTaskComponent }  
]

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent, UserComponent,
    ProjectComponent, AddProjectComponent,
    AddTaskComponent, ViewTaskComponent,
    ScrollTopDirective,    
    ModalLookupComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes), ModalModule.forRoot()
  ],
  entryComponents: [ModalLookupComponent],
  providers: [TaskService, UserService, ApiService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
