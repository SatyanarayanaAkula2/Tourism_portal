import { Component, } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { User,UserData } from '../../services/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  constructor(private fb:FormBuilder,private toast:ToastService,private users:UserData,private router:Router){}
  
  loginform!:FormGroup;
  currUserData!:User;
  submitted:boolean=false;
  ngOnInit(){
    if (localStorage.getItem('user')) {
  this.router.navigate(['/home']);
}
    this.loginform=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }
  submit(){
    this.submitted=true;
    if (this.loginform.invalid) {
    this.toast.show("Enter valid details!", 'error');
    return;
  }
  const {email,password}=this.loginform.value;
    this.users.getUsers().subscribe({
      next:users=>{
      const exists=users.find(u=>u.email===email);
      if(!exists||exists.password!==password){
        this.toast.show("Invalid Credentials",'error');
        return;
      }
      else{
        this.toast.show("Login Successful",'success');
          this.loginform.reset();
          this.submitted=false;
          const expirytime=Date.now()+(10000);
          localStorage.setItem('user',JSON.stringify({
            id:exists.id,
            name:exists.name,
            email:exists.email
          }));
          localStorage.setItem('expiry',expirytime.toString());
          // window.location.reload();
          this.router.navigate(['/home']).then(()=>{
            location.reload();
          });
      }
    },
    error:()=>{
      this.toast.show("server error",'error');
    }
    });
  }
}
