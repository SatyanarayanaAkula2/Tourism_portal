import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from './services/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Tourism');
  constructor(private router:Router,private auth:Authservice){}
  ngOnInit(){
    const expiry = localStorage.getItem('expiry');
  if (expiry) this.auth.startexpirytimer(+expiry);
  }
  
}
