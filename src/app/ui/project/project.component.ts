import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import * as _ from 'lodash';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  project;
  sortedBy;
  sortedOrder;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getAll()
      .subscribe(data => {        
        this.projects = data;
      });
  }

  sortProjects(sortBy: string) {    
    var sortOrder = this.sortedBy != sortBy || this.sortedOrder == "desc" ? "asc" : "desc";
    this.projects = _.orderBy(this.projects, [sortBy], [sortOrder]);
    this.sortedBy = sortBy;
    this.sortedOrder = sortOrder;
  }

  searchProjects(searchText) {
    this.projectService.search(searchText)
      .subscribe(data => {
        this.projects = data;
      });
  }

  editProject(project: Project) {
    this.project = project;
  }

  deleteProject(id: number) {    
    this.projectService.delete(id)
      .subscribe(() => {
        this.getProjects();
        alert("Project deleted successfully");
      });
  }
}
