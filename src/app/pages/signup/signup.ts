import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
    signupform!:FormGroup;
    constructor(private fb:FormBuilder){}
    
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
      console.log('submitted');
    }
}
