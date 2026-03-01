import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private logouttimer:any;
  constructor(private router:Router){}
  isLoggedin():boolean{
    const user=localStorage.getItem('user');
    const expiry=localStorage.getItem('expiry');
    if(!user||!expiry) return false;
    if(Date.now()> +expiry){
      return false;
    }
    return true;
  }
  getUser():any|null{
    try {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
  }

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
