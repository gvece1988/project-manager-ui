import { TASKS } from './../../../mock-backend/mock-data';
import { ProjectService } from './../../../services/project.service';
import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { ModalLookupComponent } from '../../../shared/components/modal-lookup/modal-lookup.component';
import { TaskService } from '../../../services/task.service';
import { ApiService } from '../../../shared/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, ModalModule.forRoot(), RouterTestingModule],
      declarations: [ ViewTaskComponent, ModalLookupComponent ],
      providers: [TaskService, ProjectService, ApiService]
    })
    .compileComponents();

    spyOn(ApiService.prototype, 'delete').and.returnValue(of({ status: 204 }));
    spyOn(ApiService.prototype, 'get').and.returnValue(of(TASKS));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get tasks", fakeAsync(inject([TaskService], (service: TaskService) => {
    let result;
    service.getByProjectId(1).subscribe(value => {
      result = value;
    });
    expect(result).toEqual(TASKS);
  })));

  it("should end task", fakeAsync(inject([TaskService], (service: TaskService) => {
    let result;
    service.end(1).subscribe(value => {
      result = value;
    });
    expect(result.status).toEqual(204);
  })));

  it("should sort tasks", () => {
    component.tasks = TASKS;
    component.sortTasks("title", "desc");
    expect(component.tasks[0].title).toBe("Test");
  });
});
