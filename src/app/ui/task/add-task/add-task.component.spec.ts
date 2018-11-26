import { ProjectService } from './../../../services/project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ApiService } from '../../../shared/services/api.service';
import { TaskService } from '../../../services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { ModalLookupComponent } from '../../../shared/components/modal-lookup/modal-lookup.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, ModalModule.forRoot(), RouterTestingModule],
      declarations: [ AddTaskComponent, ModalLookupComponent ],
      providers: [TaskService, ProjectService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('form invalid when empty', () => {
    expect(component.taskForm.valid).toBeFalsy();
  });

  it('Task title field validity', () => {
    let errors = {};
    let taskTitle = component.taskForm.controls['title'];
    errors = taskTitle.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('form valid when submitted', () => {
    expect(component.taskForm.valid).toBeFalsy();
    component.taskForm.controls['projectId'].setValue("1");
    component.taskForm.controls['title'].setValue("test task");
    component.taskForm.controls['startDate'].setValue("2018-01-01");
    component.taskForm.controls['endDate'].setValue("2018-01-01");
    expect(component.taskForm.valid).toBeTruthy();
  });
});
