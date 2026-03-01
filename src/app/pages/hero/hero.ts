import { Component,OnInit } from '@angular/core';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  username:string='';
  isloggedin:boolean=false;
 constructor(private authservice:Authservice){}
 ngOnInit(){
  this.isloggedin=this.authservice.isLoggedin();
  if(this.isloggedin){
    const user=this.authservice.getUser();
    this.username=user?.name;
  }
 }
  
}
