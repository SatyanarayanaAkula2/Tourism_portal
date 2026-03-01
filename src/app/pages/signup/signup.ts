import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { Toast } from '../../shared/toast/toast';
import { UserData,User} from '../../services/user-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
    signupform!:FormGroup;
    submitted:boolean=false;
    currentUser!:User
    constructor(private fb:FormBuilder,private toast:ToastService,private users:UserData,private router:Router){}
    
    ngOnInit(){
      this.signupform=this.fb.group({
        Name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
        cpassword:['',Validators.required]
      },
      {validators:this.passwordMatchValidator}
    );
    }
    passwordMatchValidator(form:AbstractControl){
      const password=form.get('password')?.value;
      const cpassword=form.get('cpassword')?.value;
        if (!password || !cpassword) return;
        if (cpassword.errors && !cpassword.errors['mismatch']) return;
      if(password!==cpassword){
        form.get('cpassword')?.setErrors({mismatch:true});
      }
      else form.get('cpassword')?.setErrors(null);
    }
    submit(){
      this.submitted=true;
      if(!this.signupform.valid){
        this.toast.show("Fill complete Details!",'error');
        return;
    }
    this.users.getUsers().subscribe(users=>{
      const exists=users.find(u=>u.email===this.signupform.value.email);
      if(exists){
      this.toast.show("Email Already registered!",'error');
      return;
    }
    this.createAccount();
    });
    
  }

  createAccount(){
    const newUser:User={
      name:this.signupform.value.Name,
      email:this.signupform.value.email,
      password:this.signupform.value.password
    }
    this.users.createUsers(newUser).subscribe({
      next:()=>{
          this.toast.show("signup Successful",'success');
          this.signupform.reset();
          this.submitted=false;
          const expirytime=Date.now()+(10000);
          localStorage.setItem('user',JSON.stringify({
            name:newUser.name,
            email:newUser.email
          }));
          localStorage.setItem('expiry',expirytime.toString());
          this.router.navigate(['/home']).then(()=>{
            location.reload();
          });
      },
      error:()=>{
        this.toast.show("signup failed",'error');
      }
    })
  }
}
