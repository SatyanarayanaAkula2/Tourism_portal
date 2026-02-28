import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  constructor(private fb:FormBuilder,private toast:ToastService){}
  loginform!:FormGroup;
  submitted:boolean=false;
  ngOnInit(){
    this.loginform=this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }
  submit(){
    this.submitted=true;
    
  }
}
