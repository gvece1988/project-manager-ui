import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { DateValidators } from '../../../shared/validators/date-compare.validator';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm;
  submitted = false;
  isUpdate = false;
  bsModalRef;

  get projectId() {
    return this.taskForm.get('projectId').value
  }

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: 0,
      projectId: [null, Validators.required],
      projectName: null,
      title: [null, Validators.required],
      priority: [0],
      isParentTask: false,
      parentTaskId: null,
      parentTaskTitle: null,
      startDate: null,
      endDate: null,
      userId: null,
      userName: null
    }, {
        validator: Validators.compose([
          DateValidators.dateLessThan('startDate', 'endDate', { 'startDate': true })])
      });

    if (this.route.snapshot.params['id'] != null) {
      this.isUpdate = true;
      this.route.params
        .pipe(switchMap(params =>
          this.taskService.getById(params["id"])
        ))
        .subscribe(task => this.patchTaskForm(task));
    }
  }

  patchTaskForm(task) {
    this.taskForm.patchValue({
      ...task,
      startDate: task.startDate != null ? moment(task.startDate).format("YYYY-MM-DD") : null,
      endDate: task.endDate != null ? moment(task.endDate).format("YYYY-MM-DD") : null,
      projectId: task.project != null ? task.project.id : null,
      projectName: task.project != null ? task.project.title : null,
      userId: task.user != null ? task.user.id : null,
      userName: task.user != null ? task.user.fullName : null,
      parentTaskTitle: task.parentTask != null ? task.parentTask.title : null
    });
  }

  addTask() {
    console.log(this.taskForm.value);
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }

    if (!this.isUpdate) {
      this.taskService.create(this.taskForm.value)
        .subscribe(() => {
          alert("Task created successfully");
          this.router.navigate(["/viewtask", this.projectId]);
        });
    }
    else {
      this.taskService.update(this.taskForm.value)
        .subscribe(() => {
          alert("Task updated successfully");
          this.router.navigate(["/viewtask", this.projectId]);
        });
    }
  }

  disableTaskFields(isChecked) {
    if (!isChecked) {
      this.taskForm.controls["priority"].enable();
      this.taskForm.controls["startDate"].enable();
      this.taskForm.controls["endDate"].enable();
    }
    else {
      this.taskForm.patchValue({
        userId: null, userName: null,
        parentTaskId: null, parentTaskTitle: null
      });
      this.taskForm.controls["priority"].enable();
      this.taskForm.controls["startDate"].enable();
      this.taskForm.controls["endDate"].enable();
    }
  }

  resetForm() {
    this.submitted = false;
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  updateUserSelected(lookup) {
    this.closeModal();
    this.taskForm.patchValue({ userId: lookup.id, userName: lookup.value });
  }

  updateParentTaskSelected(lookup) {
    this.closeModal();
    this.taskForm.patchValue({ parentTaskId: lookup.id, parentTaskTitle: lookup.value });
  }

  updateProjectSelected(lookup) {
    this.closeModal();
    this.taskForm.patchValue({ projectId: lookup.id, projectName: lookup.value });
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
