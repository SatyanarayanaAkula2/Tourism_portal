import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private logouttimer:any;
  private loginstatus=new BehaviorSubject<boolean>(false);
  loginstatus$=this.loginstatus.asObservable();
  constructor(private router: Router) {
  const loggedIn = this.isLoggedin();
  this.loginstatus.next(loggedIn);

  if (loggedIn) {
    const expiry = localStorage.getItem('expiry');
    if (expiry) {
      this.startexpirytimer(+expiry);
    }
  }
}
  
  login(user:any){
    const expiry=Date.now()+(60*60*1000);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('expiry',expiry.toString());
    this.loginstatus.next(true);
    this.startexpirytimer(expiry);
  }
  signup(user:any){
    this.login(user);
  }
  isLoggedin(): boolean {
  const user = localStorage.getItem('user');
  const expiry = localStorage.getItem('expiry');

  if (!user || !expiry) return false;

  return Date.now() <= +expiry;
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
    if(this.logouttimer){
      clearTimeout(this.logouttimer);
    }
    this.loginstatus.next(false);
    this.router.navigate(['/auth/login']);
  }
}
