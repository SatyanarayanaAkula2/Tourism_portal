import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Bookatour } from './pages/bookatour/bookatour';
import { Destinations } from './pages/destinations/destinations';

const routes: Routes = [
  {path:'',component:Home},
  {path:'destinations',component:Destinations},
  {path:'booking',component:Bookatour},
  {path:'contact',component:Contact},
  {path:'destinations/:type',component:Destinations},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
