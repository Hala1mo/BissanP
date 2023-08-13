import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbAlertModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CustomerComponent } from './customer/customer.component';
import {NgOptimizedImage} from "@angular/common";
import { AddComponent } from './customer/add/add.component';
import { DetailsComponent } from './customer/details/details.component';
import { EditComponent } from './customer/edit/edit.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DefinitionComponent } from './definition/definition.component';
import { DetailsDefComponent } from './definition/details-def/details-def.component';
import { AddDefComponent } from './definition/add-def/add-def.component';


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
        , NgbPaginationModule, NgOptimizedImage, FormsModule, MatCheckboxModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
