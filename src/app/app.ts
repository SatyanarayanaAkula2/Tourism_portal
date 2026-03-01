import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tourism');
  constructor(private router:Router){}
  ngOnInit(){
    this.checkloginexpiry();
  }
  checkloginexpiry(){
    const expiry=localStorage.getItem('expiry');
    if(!expiry) return;
    if(Date.now() > +expiry){
      localStorage.clear();
      alert("session expired.please login again");
      this.router.navigate(['/home']);
    }
  }
}
