import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { OnInit } from '@angular/core';
import { Destinationsservice } from '../../services/destinationsservice';
import { Destination } from '../../models/destinations';

@Component({
  selector: 'app-bookatour',
  standalone: false,
  templateUrl: './bookatour.html',
  styleUrl: './bookatour.css',
})
export class Bookatour implements OnInit {
  bookingForm!:FormGroup;
  destinations:Destination[]=[];
  mapUrl:string='';
  filtereddestinations:Destination[]=[];
    constructor(private fb: FormBuilder,private destservices:Destinationsservice){}


    ngOnInit(){
    this.bookingForm=this.fb.group({
        firstName:['',Validators.required],
        lastName:[''],
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
  }
  minDate=new Date();
    submit(){
      if(this.bookingForm.valid){
        console.log(this.bookingForm.value);
        alert("Booking submitted!");
      }
    }
    detectlocation(){
      if(!navigator.geolocation){
        alert("geolocation not supported");
        return;
      }
    this.mapUrl='';
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const lat=position.coords.latitude;
          const long=position.coords.longitude;
          this.mapUrl='https://www.google.com/maps?q='+lat+','+long+'&output=embed'
          this.getAddress(lat,long);
        },
        ()=>{
          alert("location permission denied");
        }
      );
    }

    getAddress(lat:number,long:number){

  const apiKey = "YOUR_API_KEY";

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
  });
}

    }
