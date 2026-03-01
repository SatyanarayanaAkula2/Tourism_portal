import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Tourism');
  constructor(private router:Router){}
  ngOnInit(){
    this.checkloginexpiry();
  }
  checkloginexpiry() {
  const expiry = localStorage.getItem('expiry');

  if (!expiry) return;

  const timeLeft = +expiry - Date.now();

  if (timeLeft <= 0) {
    this.logoutUser();
  } else {
    setTimeout(() => {
      this.logoutUser();
    }, timeLeft);
  }
}

logoutUser() {
  localStorage.clear();
  alert("Session expired. Please login again.");
  this.router.navigate(['/auth/login']);
}
}
