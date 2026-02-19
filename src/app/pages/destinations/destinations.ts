import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../destination-card/destination-card';
import { Destination } from '../../models/destinations';
import { Destinationsservice } from '../../services/destinationsservice';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.html',
  styleUrls: ['./destinations.css'],
  imports: [CommonModule, DestinationCard, RouterModule],
})
export class Destinations {

  destinations: Destination[] = [];
  originaldestinations: Destination[] = [];

  static savedMenuState = {
    menufilter: false,
    pricemenu: false
  };

  constructor(private route: ActivatedRoute,private destinationsservices:Destinationsservice) {}

  menufilter = false;
  pricemenu = false;

  ngOnInit() {

    this.destinations=this.destinationsservices.getdestinations();
     this.originaldestinations = [...this.destinations];

    this.menufilter = Destinations.savedMenuState.menufilter;
    this.pricemenu  = Destinations.savedMenuState.pricemenu;

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

}

