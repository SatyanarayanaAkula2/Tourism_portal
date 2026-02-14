import { Component } from '@angular/core';
import { Destination} from '../../models/destinations';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../destination-card/destination-card';
import { ActivatedRoute ,RouterModule} from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.html',
  imports:[CommonModule,DestinationCard,RouterModule],
  styleUrls: ['./destinations.css'],
})
export class Destinations {
  constructor(private route:ActivatedRoute) {}

  ngOnInit(){
    this.originaldestinations = [...this.destinations];
    this.route.paramMap.subscribe(params=>{
      const type=params.get('type');
      if(type==='popular'){
        this.sortByRating();
      }
      else if(type){
        this.filterByType(type);
      }
      else{
        this.resetfilter();
      }
    })
  }
        destinations: Destination[] = [
    {
      id: 1,
      name: 'Taj Mahal',
      place: 'Agra,India',
      image: 'assets/places/tajmahal.jpg',
      rating: 4.8,
      type:'Monuments'
    },
    {
      id: 2,
      name: 'Marina Beach',
      place: 'Tamilnadu',
      image: 'assets/places/marinabeach.jpg',
      rating: 4.6,
      type:'Beaches'
    },
    {
      id: 3,
      name: 'Marina Beach',
      place: 'Tamilnadu',
      image: 'assets/places/marinabeach.jpg',
      rating: 4.6,
      type:'Beaches'
    },
    {
      id: 4,
      name: 'Kakinada Beach',
      place: 'Andhra pradesh',
      image: 'assets/places/kkdbeach.jpg',
      rating: 4.6,
      type:'Beaches'
    },
    {
      id: 5,
      name: 'Kedarnath Temple',
      place: 'Ladakh,India',
      image: 'assets/places/kedarnathtemple.jpg',
      rating: 4.6,
      type:'Temples'
    },
    {
      id: 6,
      name: 'Araku valley',
      place: 'Andhra Pradesh',
      image: 'assets/places/araku.jpg',
      rating: 4.6,
      type:'Hill stations'
    },
    {
      id: 7,
      name: 'Bondi Beach',
      place: 'Sydney,Australia',
      image: 'assets/places/bondibeach.jpg',
      rating: 4.2,
      type:'Beaches'
    },
    {
      id: 8,
      name: 'Eiffel Tower',
      place: 'Paris,france',
      image: 'assets/places/eiffeltower.jpg',
      rating: 4.5,
      type:'Monuments'
    },
    {
      id: 9,
      name: 'shimla',
      place: 'Himachal Pradesh,India',
      image: 'assets/places/shimla.jpg',
      rating: 4.8,
      type:'Hill stations'
    },
    {
      id: 10,
      name: 'Copacabana Beach',
      place: 'Brazil',
      image: 'assets/places/copacanababeach.jpg',
      rating: 4.7,
      type:'Beaches'
    },
    {
      id: 11,
      name: 'Statue of Liberty',
      place: 'New York City',
      image: 'assets/places/sol.jpg',
      rating: 4.8,
      type:'Monuments'
    },
    {
      id: 12,
      name: 'Angkor Wat',
      place: 'Cambodia',
      image: 'assets/places/angkorwat.jpg',
      rating: 4.4,
      type:'Temples'
    },
    {
      id: 13,
      name: 'Kashi Vishwanath Temple',
      place: 'Varanasi,India',
      image: 'assets/places/kasi.jpg',
      rating: 4.5,
      type:'Temples'
    },

  ];
    originaldestinations!: Destination[];

  
  menufilter=false;
  togglefilter(){
    this.menufilter=!this.menufilter;
  }
  sortByRating(){
    this.destinations.sort((a,b)=>b.rating-a.rating);
    this.menufilter=false;
  }
  sortByRating1(){
    this.destinations.sort((a,b)=>a.rating-b.rating);
    this.menufilter=false;
  }
  filterByType(type:string){
    this.destinations=this.originaldestinations.filter(
      destination=>destination.type===type
    );
    this.menufilter=false;
  }
  resetfilter(){
    this.destinations=[...this.originaldestinations];
  }
  
}
