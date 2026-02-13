import { Component } from '@angular/core';
import { HighlightCards } from '../../models/highlightcards';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-highlights',
  standalone:false,
  templateUrl: './highlights.html',
  styleUrl: './highlights.css',
})
export class Highlights {
  highlightcards:HighlightCards[]=[
    {
      id:1,
      image:'assets/icons/airplane-flight.png',
      title:'Wide Variety Of Destinations',
      matter:'You can find a wide range of destinations based on your requirements'
    },{
      id:2,
      image:'assets/icons/airplane.png',
      title:'Booking made Easy',
      matter:'Book your dream destination in just a few clicks.Fast, secure, and hassle-free reservations every time.'
    },
    {
      id:1,
      image:'assets/icons/user-friendly.png',
      title:'User Friendly',
      matter:'Enjoy a smooth and intuitive browsing experience.Everything you need is just a click away.'
    }
  ];
}
