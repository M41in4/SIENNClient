import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthenticationService, GuardService, ProductService } from './core/index';
import { HomeComponent, LoginComponent } from './pages/index';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { ToastCustomOptions } from './helper/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot()
  ],
  providers: [
    AuthenticationService, 
    GuardService, 
    ProductService, 
    { provide: ToastOptions, useClass: ToastCustomOptions }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
