import { AddProjectComponent } from './add-project/add-project.component';
import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { ProjectService } from '../../services/project.service';
import { ApiService } from '../../shared/services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalLookupComponent } from '../../shared/components/modal-lookup/modal-lookup.component';
import { ModalModule } from 'ngx-bootstrap';
import { PROJECTS } from '../../mock-backend/mock-data';
import { of } from 'rxjs';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, ModalModule.forRoot()],
      declarations: [ProjectComponent, AddProjectComponent, ModalLookupComponent],
      providers: [ProjectService, ApiService]
    })
      .compileComponents();

    spyOn(ApiService.prototype, 'delete').and.returnValue(of({ status: 204 }));
    spyOn(ApiService.prototype, 'get').and.returnValue(of(PROJECTS));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should assign project for edit", () => {
    var project = PROJECTS[0];
    component.editProject(project);
    expect(component.project).toBe(project);
  });

  it("should get projects", fakeAsync(inject([ProjectService], (service: ProjectService) => {
    let result;
    service.getAll().subscribe(value => {
      result = value;
    });
    expect(result).toEqual(PROJECTS);
  })));

  it("should delete project", fakeAsync(inject([ProjectService], (service: ProjectService) => {
    let result;
    service.delete(1).subscribe(value => {
      result = value;
    });
    expect(result.status).toEqual(204);
  })));

  it("should sort projects", () => {
    component.sortProjects("priority");
    expect(component.projects[0].priority).toBe(2);
  });
});
