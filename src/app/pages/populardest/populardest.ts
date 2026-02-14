import { Component } from '@angular/core';
import { Desttypes } from '../../models/desttypes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-populardest',
  standalone: false,
  templateUrl: './populardest.html',
  styleUrl: './populardest.css',
})
export class Populardest {
    Title='Destinations';
    Types:Desttypes[]=[
      {
        id:1,
        title:'Beaches',
        image:'assets/places/beaches.jpg',
        content:'Relax by the soothing sound of waves and golden sands under the sun.Perfect destinations for sunsets, water sports, and peaceful holidays.',
      },
      {
        id:2,
        title:'Hill stations',
        image:'assets/places/hillstations.jpg',
        content:'Escape the heat and enjoy cool weather surrounded by misty hills.Ideal for scenic views, cozy stays, and refreshing nature walks.',
      },
      {
        id:3,
        title:'Mountains',
        image:'assets/places/mountains.jpg',
        content:'Experience breathtaking peaks and adventurous trekking trails.Mountains offer peace, beauty, and unforgettable sunrise views.',
      },
      {
        id:4,
        title:'Temples',
        image:'assets/places/temples.jpg',
        content:'Discover spiritual serenity in ancient and sacred temples.Temples reflect rich culture, devotion, and timeless architecture.',
      },
    ]
    titleupdate(title:string){
      this.Title=title;
    }
}
