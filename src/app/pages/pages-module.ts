import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { AuthLayout } from './auth-layout/auth-layout';






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
    Signup,
    Signin,
    AuthLayout,
  
  
  ],
  imports: [
    CommonModule,RouterModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,MatAutocompleteModule
  ],
})
export class PagesModule { }
