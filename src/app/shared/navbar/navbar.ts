import { Component,HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';

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
  username:string='';
  loggedin:boolean=false;
  firstchar:string='';
  constructor(private router:Router,private authservice:Authservice){
    this.router.events.subscribe(()=>{
      this.iswhite=this.router.url==='/destinations';
    })
  }
  ngOnInit(){
    this.loggedin=this.authservice.isLoggedin();
    if(this.loggedin){
      const user=this.authservice.getUser();
      this.username=user?.name||'';
      this.firstchar=this.username?this.username.charAt(0).toUpperCase():'';
    }
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
