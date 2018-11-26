import { TaskService } from './../../../services/task.service';
import { ProjectService } from './../../../services/project.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal-lookup',
  templateUrl: './modal-lookup.component.html',
  styleUrls: ['./modal-lookup.component.css']
})
export class ModalLookupComponent implements OnInit {
  lookups: { id: number, value: string }[] = [];
  allLookups;
  closeBtnName = "Close";

  @Output()
  closeClick = new EventEmitter();

  @Input()
  lookupFor: string;

  @Output()
  lookupSelect = new EventEmitter();

  constructor(private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit() {
    switch (this.lookupFor) {

      case "Project":
        this.projectService.getAll()
          .subscribe(data => {
            _.forEach(data, (m) => {
              this.lookups.push({ id: m.id, value: m.title });
            });
          });
        break;

      case "User":
        this.userService.getAll()
          .subscribe(data => {
            _.forEach(data, (m) => {
              this.lookups.push({ id: m.id, value: m.fullName });
            });
          });
        break;

      case "ParentTask":
        this.taskService.getParentTasks()
          .subscribe(data => {
            _.forEach(data, (m) => {
              this.lookups.push({ id: m.id, value: m.title });
            });
          });
        break;
    }

    this.allLookups = this.lookups;
  }

  searchLookup(searchText) {
    this.lookups = _.filter(this.allLookups,
      (m) => m.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
  }

  selectLookup(lookup) {
    this.lookupSelect.emit(lookup);
  }

  closeModal() {
    this.closeClick.emit();
  }
}
