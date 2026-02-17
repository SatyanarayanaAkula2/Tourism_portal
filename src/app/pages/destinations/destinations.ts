import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../destination-card/destination-card';
import { Destination } from '../../models/destinations';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.html',
  styleUrls: ['./destinations.css'],
  imports: [CommonModule, DestinationCard, RouterModule],
})
export class Destinations {

  // 🔹 static state survives router reload
  static savedMenuState = {
    menufilter: false,
    pricemenu: false
  };

  constructor(private route: ActivatedRoute) {}

  menufilter = false;
  pricemenu = false;

  ngOnInit() {

    // restore menu state
    this.menufilter = Destinations.savedMenuState.menufilter;
    this.pricemenu  = Destinations.savedMenuState.pricemenu;

    this.originaldestinations = [...this.destinations];

    this.route.paramMap.subscribe(params => {
      const type   = params.get('type');
      const r1     = params.get('range1');
      const r2     = params.get('range2');

      if(type === 'popular')
        this.destinations.sort((a,b)=>b.rating-a.rating);

      else if(type === 'popularrev')
        this.destinations.sort((a,b)=>a.rating-b.rating);

      else if(type === 'price' && r1 && r2)
        this.filterByPrice(r1,r2);

      else if(type)
        this.filterByType(type);

      else
        this.resetfilter();
    });
  }

  togglefilter(){
    this.menufilter = !this.menufilter;
    Destinations.savedMenuState.menufilter = this.menufilter;
  }

  pricemenuopen(){
    this.pricemenu = !this.pricemenu;
    this.menufilter = true;

    Destinations.savedMenuState.pricemenu = this.pricemenu;
    Destinations.savedMenuState.menufilter = true;
  }

  selectprice(){
    this.pricemenu = false;   // close only price menu
    this.menufilter = true;

    Destinations.savedMenuState.pricemenu = false;
    Destinations.savedMenuState.menufilter = true;
  }

  filterByPrice(r1:string,r2:string){
    const min = Number(r1);
    const max = Number(r2);

    this.destinations =
      this.originaldestinations.filter(
        d => d.price>=min && d.price<=max
      );
  }

  filterByType(type:string){
    this.destinations =
      this.originaldestinations.filter(d=>d.type===type);
  }

  resetfilter(){
    this.destinations=[...this.originaldestinations];
  }

  searchcontent(name:string){
    if(!name.trim()){
      this.resetfilter();
      return;
    }
    const s=name.toLowerCase();
    this.destinations =
      this.originaldestinations.filter(d =>
        d.name.toLowerCase().includes(s) ||
        d.place.toLowerCase().includes(s) ||
        d.type.toLowerCase().includes(s)
      );
  }

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
    originaldestinations!: Destination[];
}
