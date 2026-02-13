import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared/shared-module';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages-module';



@NgModule({
  declarations: [
    App,

  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CommonModule,PagesModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
