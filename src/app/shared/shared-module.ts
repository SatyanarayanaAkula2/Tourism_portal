import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Toast } from './toast/toast';



@NgModule({
  declarations: [
    Navbar,
    Toast
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[Navbar,Toast]
})
export class SharedModule { }
