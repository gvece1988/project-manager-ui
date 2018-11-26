import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../models/project.model';
import { ApiService } from '../shared/services/api.service';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {

  constructor(private apiService: ApiService) { }

  create(Project: Project): Observable<any> {
    return this.apiService.post("Project", Project);
  }

  update(Project: Project): Observable<any> {
    return this.apiService.put("Project", Project);
  }

  getAll(): Observable<any> {
    return this.apiService.get("Project")
      .pipe(map((Projects: Array<any>) => Projects.map(Project => this.mapProject(Project))));
  }

  search(searchText): Observable<any> {
    return this.apiService.get("Project/Search", new HttpParams().set("searchText", searchText))
      .pipe(map((Projects: Array<any>) => Projects.map(Project => this.mapProject(Project))));
  }

  getById(id: number): Observable<any> {
    return this.apiService.get("Project/GetById", new HttpParams().set("id", id.toString()))
      .pipe(map(Project => this.mapProject(Project)));
  }

  delete(id: number) {
    return this.apiService.delete("Project", new HttpParams().set("id", id.toString()));
  }

  private mapProject(project): Project {
    project.tasksCompleted = _.filter(project.tasks, (m) => m.isCompleted).length;
    return project;
  }

}
