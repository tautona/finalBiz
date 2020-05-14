import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiurl = environment.apiurl;


  constructor(private http:HttpClient) { }
  listUsers(){
    return this.http.get(this.apiurl + 'api/users');
  }

  getUser(id){
    return this.http.get(this.apiurl + 'api/users/' + id);
  }

  updateUser(id, data){
    return this.http.put(this.apiurl + 'api/users/' + id, data);

  }
  createUser(user:any){
    return this.http.post(this.apiurl + 'api/users/', user);
  }

  deleteUser(id){
    return this.http.delete(this.apiurl + 'api/users/' + id);
  }
}
