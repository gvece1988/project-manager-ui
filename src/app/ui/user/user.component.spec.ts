import { AddUserComponent } from './add-user/add-user.component';
import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../shared/services/api.service';
import { of } from 'rxjs';
import { USERS } from '../../mock-backend/mock-data';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ UserComponent, AddUserComponent ],
      providers: [UserService, ApiService]
    })
    .compileComponents();

    spyOn(ApiService.prototype, 'delete').and.returnValue(of({ status: 204 }));
    spyOn(ApiService.prototype, 'get').and.returnValue(of(USERS));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should assign user for edit", () => {
    var user = USERS[0];
    component.editUser(user);
    expect(component.user).toBe(user);
  });

  it("should get users", fakeAsync(inject([UserService], (service: UserService) => {
    let result;
    service.getAll().subscribe(value => {
      result = value;
    });
    expect(result).toEqual(USERS);
  })));

  it("should delete user", fakeAsync(inject([UserService], (service: UserService) => {
    let result;
    service.delete(1).subscribe(value => {
      result = value;
    });
    expect(result.status).toEqual(204);
  })));

  it("should sort users", () => {
    component.sortUsers("employeeId");
    expect(component.users[0].employeeId).toBe("12345");
  });
});
