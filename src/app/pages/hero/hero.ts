import { Component,OnInit } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  username:string='';
  isloggedin:boolean=false;
  private sub!:Subscription;
 constructor(private authservice:Authservice){}
 ngOnInit(){
    this.sub=this.authservice.loginstatus$.subscribe(status=>{
      this.isloggedin=status;
      if(status){
        const user=this.authservice.getUser();
        this.username=user.name||'';
      }
      else{
        this.username='';
        console.log('username not rendered');
      }
    });
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
 }
  
