import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs';

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
}
@Injectable({
  providedIn: 'root',
})
export class TestBookingData {
  private bookings:Bookings[]=[];
  constructor(){}

  getBookings(): Observable<Bookings[]> {
      return of(this.bookings).pipe(delay(500));
  }

  createBooking(booking:Bookings): Observable<Bookings> {
    booking.id=Math.floor(Math.random()*1000);
    this.bookings.push(booking);
    return of(booking).pipe(delay(500));
  }
}
