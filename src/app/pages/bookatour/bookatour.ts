import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { OnInit } from '@angular/core';
import { Destinationsservice } from '../../services/destinationsservice';
import { Destination } from '../../models/destinations';
import { environment } from '../../../environment';

@Component({
  selector: 'app-bookatour',
  standalone: false,
  templateUrl: './bookatour.html',
  styleUrl: './bookatour.css',
})
export class Bookatour implements OnInit {
  bookingForm!:FormGroup;
  destinations:Destination[]=[];
  price:number=0;
  selecteddest:any=null;
  isdetecting:boolean=false;
  submitted:boolean=false;
  mapUrl:string='';
  filtereddestinations:Destination[]=[];
    constructor(private fb: FormBuilder,private destservices:Destinationsservice){}


    ngOnInit(){
    this.bookingForm=this.fb.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
        location: ['', Validators.required],
        destination: ['', Validators.required],
        adults: [1, Validators.required],
        children: [0],
        travelDate:['',Validators.required]
    });
    this.destinations=this.destservices.getdestinations();
    this.filtereddestinations=this.destinations;
    this.bookingForm.get('destination')?.valueChanges.subscribe(value=>{
      if(!value){
        this.filtereddestinations = this.destinations;
        return;
      }

      this.filtereddestinations =
        this.destinations.filter(d =>
          d.name.toLowerCase().includes(value.toLowerCase())
        );
    });
    this.bookingForm.valueChanges.subscribe(()=>{
      this.calculateprice();
    })

  }
  minDate=new Date();
    submit(){
      this.submitted=true;
      if(this.bookingForm.valid){
        console.log(this.bookingForm.value);
        alert("Booking submitted!");
        
        this.bookingForm.reset({
          adults:1,
          children:0
        });
        this.isdetecting=false;
        this.filtereddestinations=this.destinations;
        this.price=0;
        this.mapUrl='';
        this.bookingForm.markAsPristine();
        this.bookingForm.markAsUntouched();
        this.submitted=false;
      }
      else{
        alert("fill complete details before booking!")
      }
    }
    detectlocation(){
      if(!navigator.geolocation){
        alert("geolocation not supported");
        return;
      }
      this.isdetecting=true;
    this.mapUrl='';
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const lat=position.coords.latitude;
          const long=position.coords.longitude;
          this.mapUrl='https://www.google.com/maps?q='+lat+','+long+'&output=embed'
          this.getAddress(lat,long);
        },
        ()=>{
          this.isdetecting=false;
          alert("location permission denied");
        }
      );
    }

    getAddress(lat:number,long:number){

  const apiKey = environment.api_key;

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`
  )
  .then(res=>res.json())
  .then(data=>{
    const address =
      data.results[0]?.formatted_address;

    this.bookingForm.patchValue({
      location: address
    });
    this.isdetecting=false;
  })
  .catch(()=>{
    this.isdetecting=false;
  })
}

calculateprice(){
  const destname=this.bookingForm.value.destination;
  const adults=this.bookingForm.value.adults||1;
  const children=this.bookingForm.value.children||0;
  const dest=this.destinations.find(d=>d.name==destname);
  if(!dest){
    this.price=0;
    return;
  }
  const adultprice=dest.price*adults;
  const childprice=dest.price*0.5*children;
  this.price=adultprice+childprice;
}

    }
