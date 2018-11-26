import { Component, OnInit } from '@angular/core';


import { UserService } from './../../services/user.service';
import { User } from '../../models/user.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  user;
  sortedBy;
  sortedOrder;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
      });
  }

  sortUsers(sortBy: string) {
    var sortOrder = this.sortedBy != sortBy || this.sortedOrder == "desc" ? "asc" : "desc";
    this.users = _.orderBy(this.users, [sortBy], [sortOrder]);
    this.sortedBy = sortBy;
    this.sortedOrder = sortOrder;
  }

  searchUsers(searchText) {
    this.userService.search(searchText)
      .subscribe(data => {
        this.users = data;
      });
  }

  editUser(user: User) {
    this.user = user;
  }

  deleteUser(id: number) {    
    this.userService.delete(id)
      .subscribe(() => {
        this.getUsers();
        alert("User deleted successfully");
      });
  }
}
