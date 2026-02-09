import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';
import { Destinations } from './destinations/destinations';
import { Bookatour } from './bookatour/bookatour';
import { Contact } from './contact/contact';



@NgModule({
  declarations: [
    Home,
    Destinations,
    Bookatour,
    Contact
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
