import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {UserComponent} from './components/user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbAlertModule, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CustomerComponent} from './components/customer/customer.component';
import {NgOptimizedImage} from "@angular/common";
import {CustomerDetailsComponent} from './components/customer/details/customer-details.component';
import {AddUserComponent} from "./components/user/add/add-user.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DefinitionComponent} from './components/definition/definition.component';
import {DefinitionDetailsComponent} from './components/definition/definition-details/definition-details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {AssignmentDetailsComponent} from './components/assignments/assignment-details.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {ReportsComponent} from "./components/reports/reports.component";
import {StatusComponent} from './components/reports/status/status.component';
import {EditUserComponent} from "./components/user/edit-user/edit-user.component";
import {DateComponent} from "./components/reports/date/date.component";
import {DefinitionDialogComponent} from './components/definition/definition-dialog/definition-dialog.component';
import {FilterCusComponent} from './components/reports/filter-cus/filter-cus.component';
import {TypesComponent} from './components/reports/types/types.component';
import { CusComponent } from './components/reports/date/cus/cus.component';
import { DetailsCusComponent } from './components/reports/date/details-cus/details-cus.component';
import {CusDetailsComponent} from "./components/customer/cus-details/cus-details.component";
import { CustomerDialogueComponent } from './components/customer/customer-dialogue/customer-dialogue.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserComponent,
        CustomerComponent,
        CustomerDetailsComponent,
        DefinitionComponent,
        DefinitionDetailsComponent,
        AssignmentDetailsComponent,
        AddUserComponent,
        EditUserComponent,
        ReportsComponent,
        StatusComponent,
        DateComponent,
        EditUserComponent,
        DefinitionDialogComponent,
        EditUserComponent,
        FilterCusComponent,
        TypesComponent,
        CusComponent,
        DetailsCusComponent,
        CusDetailsComponent,
        CustomerDialogueComponent


    ],
    imports: [
        BrowserModule,
        MatSnackBarModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        NgbAlertModule,
        NgbModule,
        NgbPaginationModule,
        NgOptimizedImage,
        FormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSortModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatCardModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
