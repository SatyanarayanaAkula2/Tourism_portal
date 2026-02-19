import { Injectable } from '@angular/core';
import { Destination } from '../models/destinations';

@Injectable({
  providedIn: 'root',
})
export class Destinationsservice {
 destinations: Destination[] = [
    {
      id: 1,
      name: 'Taj Mahal',
      place: 'Agra,India',
      image: 'assets/places/tajmahal.jpg',
      rating: 4.8,
      price:3500,
      type:'Monuments'
    },
    {
      id: 2,
      name: 'Marina Beach',
      place: 'Tamilnadu',
      image: 'assets/places/marinabeach.jpg',
      rating: 4.6,
      price:4000,
      type:'Beaches'
    },
    {
      id: 3,
      name: 'Marina Beach',
      place: 'Tamilnadu',
      image: 'assets/places/marinabeach.jpg',
      rating: 4.6,
      price:4000,
      type:'Beaches'
    },
    {
      id: 4,
      name: 'Kakinada Beach',
      place: 'Andhra pradesh',
      image: 'assets/places/kkdbeach.jpg',
      rating: 4.6,
      price:1500,
      type:'Beaches'
    },
    {
      id: 5,
      name: 'Kedarnath Temple',
      place: 'Ladakh,India',
      image: 'assets/places/kedarnathtemple.jpg',
      rating: 4.6,
      price:4500,
      type:'Temples'
    },
    {
      id: 6,
      name: 'Araku valley',
      place: 'Andhra Pradesh',
      image: 'assets/places/araku.jpg',
      rating: 4.6,
      price:2500,
      type:'Hill stations'
    },
    {
      id: 7,
      name: 'Bondi Beach',
      place: 'Sydney,Australia',
      image: 'assets/places/bondibeach.jpg',
      rating: 4.2,
      price:15000,
      type:'Beaches'
    },
    {
      id: 8,
      name: 'Eiffel Tower',
      place: 'Paris,france',
      image: 'assets/places/eiffeltower.jpg',
      rating: 4.5,
      price:25000,
      type:'Monuments'
    },
    {
      id: 9,
      name: 'shimla',
      place: 'Himachal Pradesh,India',
      image: 'assets/places/shimla.jpg',
      rating: 4.8,
      price:2000,
      type:'Hill stations'
    },
    {
      id: 10,
      name: 'Copacabana Beach',
      place: 'Brazil',
      image: 'assets/places/copacanababeach.jpg',
      rating: 4.7,
      price:26500,
      type:'Beaches'
    },
    {
      id: 11,
      name: 'Statue of Liberty',
      place: 'New York City',
      image: 'assets/places/sol.jpg',
      rating: 4.8,
      price:22000,
      type:'Monuments'
    },
    {
      id: 12,
      name: 'Angkor Wat',
      place: 'Cambodia',
      image: 'assets/places/angkorwat.jpg',
      rating: 4.4,
      price:17000,
      type:'Temples'
    },
    {
      id: 13,
      name: 'Kashi Vishwanath Temple',
      place: 'Varanasi,India',
      image: 'assets/places/kasi.jpg',
      rating: 4.5,
      price:5000,
      type:'Temples'
    },

  ];
  getdestinations(){
    return this.destinations;
  } 
}
