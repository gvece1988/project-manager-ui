import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService } from '../shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user.model';
import { USERS } from '../mock-backend/mock-data';
import { of } from 'rxjs';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService, ApiService]
    });

    spyOn(ApiService.prototype, 'get').and.returnValue(of(USERS));
    spyOn(ApiService.prototype, 'post').and.returnValue(of({ status: 201 }));
    spyOn(ApiService.prototype, 'delete').and.returnValue(of({ status: 204 }));
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should create user', fakeAsync(inject([UserService], (service: UserService) => {
    let actual;
    service.create(USERS[0]).subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual.status).toEqual(201);
  })));

  it('should return all users', fakeAsync(inject([UserService], (service: UserService) => {
    let actual: User[];
    service.getAll().subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual).toEqual(USERS);
  })));

  it('should delete user', fakeAsync(inject([UserService], (service: UserService) => {
    let actual;
    service.delete(1).subscribe(result => {
      actual = result;
    });
    tick();
    expect(actual.status).toEqual(204);
  })));
});
