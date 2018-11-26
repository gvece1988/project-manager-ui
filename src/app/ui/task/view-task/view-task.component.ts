import { ProjectService } from './../../../services/project.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks;
  sortedBy;
  sortedOrder;
  bsModalRef;
  project = null;

  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private modalService: BsModalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    if (id != null) {
      this.projectService.getById(id).subscribe(data => {
        this.project = { id: data.id, value: data.title };
        this.getTasks(id);
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  updateSearchProject(lookup) {
    this.bsModalRef.hide();
    this.project = { id: lookup.id, value: lookup.value };
    this.getTasks(lookup.id);
  }

  getTasks(projectId) {
    this.taskService.getByProjectId(projectId).subscribe(value => {
      console.log(value);
      this.tasks = value;
    });
  }

  sortTasks(sortBy: string, sortOrder) {
    if (!(sortOrder != null && this.sortedBy != sortBy)) {
      sortOrder = this.sortedBy != sortBy || this.sortedOrder == "desc" ? "asc" : "desc";
    }
    this.tasks = _.orderBy(this.tasks, [sortBy], [sortOrder]);
    this.sortedBy = sortBy;
    this.sortedOrder = sortOrder;
  }

  endTask(taskId) {
    this.taskService.end(taskId).subscribe(
      () => {
        alert("Task ended successfully");
        this.getTasks(this.project.id);
      });
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
