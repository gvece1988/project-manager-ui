import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../shared/services/api.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [AddUserComponent],
      providers: [UserService, ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('Project title field validity', () => {
    let errors = {};
    let firstName = component.userForm.controls['firstName'];
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('form valid when submitted', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls['employeeId'].setValue("12345");
    component.userForm.controls['firstName'].setValue("Test");
    component.userForm.controls['lastName'].setValue("user");
    expect(component.userForm.valid).toBeTruthy();
  });

  it("should reset form", () => {
    component.userForm.patchValue({ employeeId: "123" });
    component.resetForm();
    expect(component.userForm.controls["employeeId"].value).toBeNull();
  })
});
