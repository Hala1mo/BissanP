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
import {NgbAlertModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CustomerComponent } from './customer/customer.component';
import {NgOptimizedImage} from "@angular/common";
import { AddComponent } from './customer/add/add.component';
import { DetailsComponent } from './customer/details/details.component';
import { EditComponent } from './customer/edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    CustomerComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,

  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, MatDialogModule, NgbAlertModule, NgbModule
    , NgbPaginationModule, NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
