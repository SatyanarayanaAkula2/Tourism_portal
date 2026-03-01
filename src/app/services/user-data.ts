import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';

export interface User{
  id?:number;
  name:string;
  email:string;
  password:string;
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

  deleteBooking(id:number){
      return this.http.delete(`${this.apiurl}/${id}`);
    }
  
    updateBooking(id:number,user:User){
      return this.http.put(`${this.apiurl}/${id}`,user);
    }
  
}
