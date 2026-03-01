import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private logouttimer:any;
  constructor(private router:Router){}
  startexpirytimer(expirytime:number){
    const timeleft=expirytime-Date.now();
    if(timeleft<=0){
      this.logout();
      return;
    }
    this.logouttimer=setTimeout(()=>{
      this.logout();
    },timeleft)
  }
  logout(){
    localStorage.clear();
    alert("session expired.please login again");
    this.router.navigate(['/auth/login']);
  }
}
