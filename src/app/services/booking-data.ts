import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface Bookings{
  id?:number;
  firstName:string;
  lastName:string;
  mobile:string;
  email:string;
  location:string;
  destination:string;
  date:string;
  adults:number;
  children:number;
  price:number;
}
@Injectable({
  providedIn: 'root',
})
export class TestBookingData {
  private bookings:Bookings[]=[];
  private apiUrl='http://localhost:3000/bookings';
  constructor(private http:HttpClient){}

  getBookings(): Observable<Bookings[]> {
      return this.http.get<Bookings[]>(this.apiUrl);
  }

  createBooking(booking:Bookings): Observable<Bookings> {
    return this.http.post<Bookings>(this.apiUrl,booking);
  }
  
  showerror():Observable<any>{
    return this.http.get('http://localhost:3000/wrong-url')
}
  deleteBooking(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateBooking(id:number,booking:Bookings){
    return this.http.put(`${this.apiUrl}/${id}`,booking);
  }
}
