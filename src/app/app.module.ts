import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbAlertModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CustomerComponent } from './components/customer/customer.component';
import {NgOptimizedImage} from "@angular/common";
import { AddComponent } from './components/customer/add/add.component';
import { DetailsComponent } from './components/customer/details/details.component';
import { EditComponent } from './components/customer/edit/edit.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DefinitionComponent } from './components/definition/definition.component';
import { DetailsDefComponent } from './components/definition/details-def/details-def.component';
import { AddDefComponent } from './components/definition/add-def/add-def.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    CustomerComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    DefinitionComponent,
    DetailsDefComponent,
    AddDefComponent,


  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, MatDialogModule, NgbAlertModule, NgbModule
    , NgbPaginationModule, NgOptimizedImage, FormsModule, MatCheckboxModule, MatInputModule, MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
