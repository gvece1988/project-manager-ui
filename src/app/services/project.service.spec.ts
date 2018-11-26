import { PROJECTS } from './../mock-backend/mock-data';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { ApiService } from '../shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../models/project.model';
import { of } from 'rxjs';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProjectService, ApiService]
    });

    spyOn(ApiService.prototype, 'get').and.returnValue(of(PROJECTS));
    spyOn(ApiService.prototype, 'post').and.returnValue(of({ status: 201 }));
    spyOn(ApiService.prototype, 'delete').and.returnValue(of({ status: 204 }));
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));

  it('should create project', fakeAsync(inject([ProjectService], (service: ProjectService) => {
    let actual;
    service.create(PROJECTS[0]).subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual.status).toEqual(201);
  })));

  it('should return all projects', fakeAsync(inject([ProjectService], (service: ProjectService) => {
    let actual: Project[];
    service.getAll().subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual).toEqual(PROJECTS);
  })));

  it('should delete project', fakeAsync(inject([ProjectService], (service: ProjectService) => {
    let actual;
    service.delete(1).subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual.status).toEqual(204);
  })));
});
