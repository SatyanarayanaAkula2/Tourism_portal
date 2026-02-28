import { Component,HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen=false;
  dark=false;
  isScrolled=false;
  iswhite=false;
  constructor(private router:Router){
    this.router.events.subscribe(()=>{
      this.iswhite=this.router.url==='/destinations';
    })
  }
  @HostListener('window:scroll',[])
     onScroll(){
      this.isScrolled=window.scrollY>80;
     }
  togglemenu(){
    this.menuOpen=!this.menuOpen;
  }
  togglemenu2(){
    this.dark=!this.dark;
  }
  gotosignup() {
  this.menuOpen=false;
  this.router.navigate(['/signup']);
}
}
