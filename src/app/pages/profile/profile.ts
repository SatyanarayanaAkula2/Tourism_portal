import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { User, UserData } from '../../services/user-data';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Bookings, TestBookingData } from '../../services/booking-data';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user!:User;
  editmode=false;
  private sub!:Subscription;
  loggedin:boolean=false;
  mybookings:any;
  profileform!:FormGroup;
 constructor(private authservice:Authservice,private fb:FormBuilder,private toast:ToastService, private users:UserData,private bookings:TestBookingData){}
 ngOnInit() {

  const loggedUser = this.authservice.getUser();

  if (!loggedUser) {
    this.loggedin = false;
    return;
  }

  this.loggedin = true;

 
  this.users.getUserById(loggedUser.id).subscribe({
    next: (data) => {
      this.user = data;
    },
    error: (err) => {
      console.error(err);
    }
  });

}
 enableedit(){
  this.editmode=true;
  this.profileform=this.fb.group({
    name:[this.user.name],
    email:[this.user.email],
    mobile:[this.user.mobile||''],
    place:[this.user.place||'']
  });
 }
 saveprofile() {
  if (!this.user?.id) return;

  const updateduser: User = {
    ...this.user,
    ...this.profileform.value
  };

  this.users.updateUser(this.user.id, updateduser).subscribe({
    next: (response) => {
      this.user = response;   // use backend response
      this.editmode = false;  // 🔥 closes overlay
      document.body.style.overflow = 'auto'; // restore scroll
      this.toast.show("Profile updated successfully", 'success');
    },
    error: (err) => {
      console.error("Update failed:", err);
    }
  });
}
 logout(){
  this.authservice.logout();
 }
 closeedit(){
  this.editmode=false;
 }

 ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();  
    }
  }
}
