import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { ApiService } from '../shared/services/api.service';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) { }

  create(user: User): Observable<any> {
    return this.apiService.post("User", user);
  }

  update(user: User): Observable<any> {    
    return this.apiService.put("User", user);
  }

  getAll(): Observable<any> {
    return this.apiService.get("User");
  }

  search(searchText): Observable<any> {
    return this.apiService.get("User/Search", new HttpParams().set("searchText", searchText));
  }

  getById(id: number): Observable<any> {
    return this.apiService.get("User", new HttpParams().set("id", id.toString()));
  }

  delete(id: number) {    
    return this.apiService.delete("User", new HttpParams().set("id", id.toString()));
  }
}
