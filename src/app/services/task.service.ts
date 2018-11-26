import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../shared/services/api.service';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
  constructor(private apiService: ApiService) { }

  create(task: Task): Observable<any> {
    return this.apiService.post("Task", task);
  }

  update(task: Task): Observable<any> {
    return this.apiService.put("Task", task);
  }

  getAll(): Observable<any> {
    return this.apiService.get("Task");
  }

  getParentTasks(): Observable<any> {
    return this.apiService.get("Task/GetParentTasks");
  }

  getByProjectId(projectId): Observable<any> {
    return this.apiService.get("Task/GetByProjectId", new HttpParams().set("projectId", projectId));
  }

  getById(taskId: number): Observable<any> {
    return this.apiService.get("Task/GetById", new HttpParams().set("id", taskId.toString()));
  }

  end(taskId: number): Observable<any> {
    return this.apiService.delete("Task", new HttpParams().set("id", taskId.toString()));
  }
}
