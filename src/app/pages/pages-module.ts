import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';

import { Bookatour } from './bookatour/bookatour';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Highlights } from './highlights/highlights';
import { Populardest } from './populardest/populardest';







@NgModule({
  declarations: [
    Home,
    Bookatour,
    Contact,
    Hero,
    Highlights,
    Populardest,
  
  
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
