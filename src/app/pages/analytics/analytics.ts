import { AfterViewInit, Component } from '@angular/core';
import { Bookings, TestBookingData } from '../../services/booking-data';
import {Chart} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ViewChild,ElementRef } from '@angular/core';
import { submit } from '@angular/forms/signals';

Chart.register(ChartDataLabels);
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
  @ViewChild('bookingBarChart') bookingBarChartRef!:ElementRef;
  @ViewChild('popularityPieChart') popularityChartRef!:ElementRef;
  @ViewChild('monthlyBarChart') monthlyChartRef!:ElementRef;
  monthlyChart!:Chart;
  popularityChart!:Chart;
  topDestinations:{destination:string,count:number}[]=[];
  leastDestinations:{destination:string,count:number}[]=[];

  months = [
  { name: 'January', value: 0 },
  { name: 'February', value: 1 },
  { name: 'March', value: 2 },
  { name: 'April', value: 3 },
  { name: 'May', value: 4 },
  { name: 'June', value: 5 },
  { name: 'July', value: 6 },
  { name: 'August', value: 7 },
  { name: 'September', value: 8 },
  { name: 'October', value: 9 },
  { name: 'November', value: 10 },
  { name: 'December', value: 11 }
];
 selectedmonth:number=0;
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
      this.generateMonthlyChart(this.selectedmonth);
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
    const ctx=this.bookingBarChartRef.nativeElement.getContext('2d');

    const gradient=ctx.createLinearGradient(0,0,0,400);
    gradient.addColorStop(0,'#1fc5db');
    gradient.addColorStop(1,'#089cce');
    this.BookingChart=new Chart(ctx,{
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
        maintainAspectRatio:false,
       animation:{
          duration:1200
        },
        plugins:{
          legend:{display:false},
          datalabels:{
            anchor:'end',
            align:'top',
            color:'#0A2540',
            font:{weight:'bold'}
          }
        }
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
        maintainAspectRatio:false,
        animation:{
          animateRotate:true,
          animateScale:true
        }
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
  onMonthChange(event:any){
    this.selectedmonth=Number(event.target.value);
    if(this.selectedmonth==null) return;
    this.generateMonthlyChart(this.selectedmonth);
  }
  generateMonthlyChart(month:number){
    const monthCounts:{[key:string]:number}={};
    this.bookings.forEach(b=>{
      const bookingDate=new Date(b.date);
      const bookingMonth=bookingDate.getMonth();
      if(bookingMonth==month){
        if(monthCounts[b.destination]){
          monthCounts[b.destination]++;
        }
        else{
          monthCounts[b.destination]=1;
        }
      }
    });
    const sorted=Object.entries(monthCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const destinations=sorted.map(d=>d[0]);
    const counts=sorted.map(d=>d[1]);
    if(this.monthlyChart){
      this.monthlyChart.destroy();
    }
     const ctx=this.monthlyChartRef.nativeElement.getContext('2d');

    const gradient=ctx.createLinearGradient(0,0,0,400);
    gradient.addColorStop(0,'#4facfe');
    gradient.addColorStop(1,'#00f2fe');
    this.monthlyChart=new Chart(ctx,{
        type:'bar',
        data:{
          labels:destinations,
          datasets:[
            {
              label:'Bookings',
              data:counts,
              backgroundColor:'#1fc5db'
            }
          ]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{
          duration:1200
        },
        plugins:{
          legend:{display:false},
          datalabels:{
            anchor:'end',
            align:'top',
            color:'#0A2540'
          }
        }
      }
    });
  }
}
