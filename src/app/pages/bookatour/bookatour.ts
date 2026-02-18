import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-bookatour',
  standalone: false,
  templateUrl: './bookatour.html',
  styleUrl: './bookatour.css',
})
export class Bookatour implements OnInit {
  bookingForm!:FormGroup;
    constructor(private fb: FormBuilder){}
    ngOnInit(){
    this.bookingForm=this.fb.group({
        firstName:['',Validators.required],
        lastName:[''],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
        location: ['', Validators.required],
        destination: ['', Validators.required],
        adults: [1, Validators.required],
        children: [0]
    });
  }
    submit(){
      if(this.bookingForm.valid){
        console.log(this.bookingForm.value);
        alert("Booking submitted!");
      }
    }
}
