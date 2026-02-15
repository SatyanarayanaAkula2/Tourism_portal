import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';

import { Bookatour } from './bookatour/bookatour';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Highlights } from './highlights/highlights';
import { Populardest } from './populardest/populardest';
import { Router, RouterModule } from '@angular/router';
import { About } from './about/about';
import { Footer } from './footer/footer';






@NgModule({
  declarations: [
    Home,
    Bookatour,
    Contact,
    Hero,
    Highlights,
    Populardest,
    About,
    Footer,
  
  
  ],
  imports: [
    CommonModule,RouterModule
  ],
})
export class PagesModule { }
