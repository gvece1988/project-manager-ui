import { ApiService } from '../shared/services/api.service';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Task } from '../models/task.model';
import { TASKS } from '../mock-backend/mock-data';

describe('TaskService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TaskService, ApiService]
    });

    spyOn(ApiService.prototype, 'get').and.returnValue(of(TASKS));
    spyOn(ApiService.prototype, 'post').and.returnValue(of({ status: 201 }));
    spyOn(ApiService.prototype, 'delete').and.returnValue(of({ status: 204 }));
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it('should create task', fakeAsync(inject([TaskService], (service: TaskService) => {
    let actual;
    service.create(TASKS[0]).subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual.status).toEqual(201);
  })));

  it('should return all tasks', fakeAsync(inject([TaskService], (service: TaskService) => {
    let actual: Task[];
    service.getAll().subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual).toEqual(TASKS);
  })));

  it('should end task', fakeAsync(inject([TaskService], (service: TaskService) => {
    let actual;
    service.end(1).subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual.status).toEqual(204);
  })));
});
