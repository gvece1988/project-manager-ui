import { ModalLookupComponent } from './../../../shared/components/modal-lookup/modal-lookup.component';
import { ProjectService } from './../../../services/project.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { ApiService } from '../../../shared/services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, ModalModule.forRoot()],
      declarations: [AddProjectComponent, ModalLookupComponent],
      providers: [ProjectService, ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.projectForm.valid).toBeFalsy();
  });

  it('start and end dates should be set', () => {
    expect(component.projectForm.controls['startDate'].value).toBeNull();
    component.setStartEndDates(true);
    expect(component.projectForm.controls['startDate'].value).not.toBeNull();
  });

  it('Project title field validity', () => {
    let errors = {};
    let projectTitle = component.projectForm.controls['title'];
    errors = projectTitle.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('form valid when submitted', () => {
    expect(component.projectForm.valid).toBeFalsy();
    component.projectForm.controls['title'].setValue("test task");
    component.projectForm.controls['startDate'].setValue("2018-01-01");
    component.projectForm.controls['endDate'].setValue("2018-01-01");
    expect(component.projectForm.valid).toBeTruthy();
  });
});
