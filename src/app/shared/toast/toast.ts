import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  message:string='';
  type='';
  show=false;
  timer:any;
  constructor(private toast:ToastService,private cd:ChangeDetectorRef){
    this.toast.toastState$.subscribe(data=>{
      this.message=data.message;
      this.type=data.type;
      this.show=true;
      clearTimeout(this.timer);
      this.timer=setTimeout(()=> {
        this.show=false;
        this.cd.detectChanges();
      },3000);
    })
  }
}
