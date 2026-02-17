import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen=false;
  dark=false;
  togglemenu(){
    this.menuOpen=!this.menuOpen;
  }
  togglemenu2(){
    this.dark=!this.dark;
  }
}
