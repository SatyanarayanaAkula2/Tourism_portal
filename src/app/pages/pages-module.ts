import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';

import { Bookatour } from './bookatour/bookatour';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Highlights } from './highlights/highlights';







@NgModule({
  declarations: [
    Home,
    Bookatour,
    Contact,
    Hero,
    Highlights,
  
  
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
