import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';

export interface User{
  id?:number;
  name:string;
  email:string;
  password:string;
  mobile?:string;
  place?:string;
}
@Injectable({
  providedIn: 'root',
})
export class UserData {
  private users:User[]=[];
  private apiurl='http://localhost:3000/users';
  constructor(private http:HttpClient){};

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiurl);
  }

  createUsers(user:User): Observable<User>{
    return this.http.post<User>(this.apiurl,user);
  }

  deleteUser(id:number){
      return this.http.delete(`${this.apiurl}/${id}`);
    }
  
    updateUser(id:number,user:User){
      return this.http.put<User>(`${this.apiurl}/${id}`,user);
    }
      getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiurl}/${id}`);
    }
  
}
