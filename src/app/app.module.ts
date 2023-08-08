import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbAlertModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    CustomerComponent,

  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule, BrowserAnimationsModule,MatDialogModule,NgbAlertModule, NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
