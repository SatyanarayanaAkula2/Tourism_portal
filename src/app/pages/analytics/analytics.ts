import { AfterViewInit, Component } from '@angular/core';
import { Bookings, TestBookingData } from '../../services/booking-data';
import {Chart} from 'chart.js/auto';
import { ViewChild,ElementRef } from '@angular/core';
import { submit } from '@angular/forms/signals';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements AfterViewInit{
  bookings:Bookings[]=[];
  destinationcounts:{[key:string]:number}={};
  BookingChart!:Chart;
  @ViewChild('popularityPieChart') popularityChartRef!:ElementRef;
  popularityChart!:Chart;
  topDestinations:{destination:string,count:number}[]=[];
  leastDestinations:{destination:string,count:number}[]=[];
  constructor(private bookingservice:TestBookingData){}

  ngAfterViewInit(){
    this.loadBookings();
  }

  loadBookings(){
    this.bookingservice.getBookings().subscribe( data=>{
      this.bookings=data;
      this.calculateBookingDistribution();
      this.createBarChart();
      this.createPopularityChart();
      this.calculateTopDestinations();
    })
  }

  calculateBookingDistribution(){
    this.destinationcounts={};
    this.bookings.forEach(b=>{
      if(this.destinationcounts[b.destination]){
        this.destinationcounts[b.destination]++;
      }
      else{
        this.destinationcounts[b.destination]=1;
      }
    });
  }

  createBarChart(){
    const destinations=Object.keys(this.destinationcounts);
    const counts=Object.values(this.destinationcounts);
    if(this.BookingChart){
      this.BookingChart.destroy();
    }
    this.BookingChart=new Chart("bookingBarChart",{
      type:'bar',
      data:{
        labels:destinations,
        datasets:[
          {
            label:'Bookings',
            data:counts,
            backgroundColor:'#089cce'
          }
        ]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false
      }
    });
  }
  createPopularityChart(){
    const destinations=Object.keys(this.destinationcounts);
    const counts=Object.values(this.destinationcounts);
    if(this.popularityChart){
      this.popularityChart.destroy();
    }
    const total=counts.reduce((sum,val)=>sum+val,0);
    const percentages=counts.map(c=>Number(((c/total)*100).toFixed(1)));
    this.popularityChart = new Chart(this.popularityChartRef.nativeElement,{
      type:'pie',
      data:{
        labels:destinations,
        datasets:[
          {
            data:percentages,
            backgroundColor:[
              '089cce',
              '#1fc5db',
            '#4caf50',
            '#ff9800',
            '#9c27b0'
            ]
          }
        ]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false
      }
    });
  }
  calculateTopDestinations(){
    const entries=Object.entries(this.destinationcounts);
    const sorted=entries.sort((a,b)=>b[1]-a[1]);
    this.topDestinations=sorted.slice(0,5).map(item=>({
      destination:item[0],
      count:item[1]
    }));
    this.leastDestinations=sorted.slice(-5).map(item=>({
      destination:item[0],
      count:item[1]
    }));
  }
}
