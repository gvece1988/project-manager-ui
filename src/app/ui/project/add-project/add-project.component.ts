import { Component, OnInit, EventEmitter, Output, Input, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import * as moment from 'moment';
import { DateValidators } from '../../../shared/validators/date-compare.validator';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm;
  isUpdate = false;
  submitted = false;
  modalRef: BsModalRef;

  @Output()
  projectSubmit = new EventEmitter();

  @Input()
  set project(project) {

    if (project != null) {
      this.isUpdate = true;
      var isChecked = project.startDate != null;

      this.projectForm.patchValue({
        ...project,
        startDate: moment(project.startDate).format("YYYY-MM-DD"),
        endDate: moment(project.endDate).format("YYYY-MM-DD"),
        setDuration: isChecked,
        managerName: project.manager != null ? project.manager.fullName : null
      });

      this.setDatesState(isChecked);
    }
  }

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      id: 0,
      title: [null, Validators.required],
      priority: 0,
      setDuration: false,
      startDate: [{ value: null, disabled: true }],
      endDate: [{ value: null, disabled: true }],
      managerId: null,
      managerName: null
    }, {
        validator: Validators.compose([
          DateValidators.dateLessThan('startDate', 'endDate', { 'startDate': true })])
      });
  }

  submitProject() {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    if (!this.isUpdate) {
      this.projectService.create(this.projectForm.value)
        .subscribe(() => {
          this.resetForm();
          this.projectSubmit.emit();
          alert("Project created successfully");
        });
    }
    else {
      this.projectService.update(this.projectForm.value)
        .subscribe(() => {
          this.resetForm();
          this.projectSubmit.emit();
          this.isUpdate = false;
          alert("Project updated successfully");
        });
    }
  }

  setStartEndDates(isChecked) {
    this.projectForm.patchValue({
      startDate: isChecked ? moment().format("YYYY-MM-DD") : null,
      endDate: isChecked ? moment().add({ days: 1 }).format("YYYY-MM-DD") : null
    });

    this.setDatesState(isChecked);
  }

  setDatesState(isChecked) {
    if (isChecked) {
      this.projectForm.controls["startDate"].enable();
      this.projectForm.controls["endDate"].enable();
    }
    else {
      this.projectForm.controls["startDate"].disable();
      this.projectForm.controls["endDate"].disable();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateManager(lookup) {
    this.modalRef.hide();
    this.projectForm.patchValue({ managerId: lookup.id, managerName: lookup.value });
  }

  cancelEdit() {
    this.isUpdate = false;
    this.resetForm();
  }

  closeModal() {
    this.modalRef.hide();
  }

  resetForm() {
    this.submitted = false;
    this.projectForm.reset({ id: 0, priority: 0 });
    this.setDatesState(false);
  }
}
