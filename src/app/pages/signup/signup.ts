import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { Toast } from '../../shared/toast/toast';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
    signupform!:FormGroup;
    submitted:boolean=false;
    constructor(private fb:FormBuilder,private toast:ToastService){}
    
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
  }
}
