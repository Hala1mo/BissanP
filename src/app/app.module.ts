import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {UserComponent} from './components/user/user.component';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
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
import {MatLineModule, MatNativeDateModule} from '@angular/material/core';
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
import {CusComponent} from './components/reports/date/cus/cus.component';
import {DetailsCusComponent} from './components/reports/date/details-cus/details-cus.component';
import {CustomerDialogComponent} from './components/customer/customer-dialog/customer-dialog.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTabsModule} from "@angular/material/tabs";
import {ContactDialogueComponent} from './components/customer/details/contact-dialogue/contact-dialogue.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {TypesChartComponent} from './components/reports/types-chart/types-chart.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {CreateAssignmentDialogComponent} from './components/assignments/create/create-assignment-dialog.component';
import {UserDetailsComponent} from './components/user/user-details/user-details.component';
import {TypeDialogComponent} from './components/definition/type-dialog/type-dialog.component';
import {CityDialogComponent} from './components/definition/city-dialog/city-dialog.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {
  AssignNewCustomerDialogComponent
} from './components/customer/assign-new-customer-dialog/assign-new-customer-dialog.component';
import {HomeComponent} from './components/home/home.component';
import {TopBarComponent} from './components/home/top-bar/top-bar.component';
import {MidBarComponent} from './components/home/mid-bar/mid-bar.component';
import {LineGraphComponent} from './components/home/mid-bar/line-graph/line-graph.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {UserPerformanceComponent} from './components/reports/user-performance/user-performance.component';
import {LoginComponent} from './auth/login/login.component';
import {BotBarComponent} from './components/home/bot-bar/bot-bar.component';
import {SpecificUserComponent} from './components/reports/specific-user/specific-user.component';
import {ErrorInterceptor} from "./interceptors/error-interceptor.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CustomerPerformanceComponent} from './components/reports/customer-performance/customer-performance.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {DetailsComponent} from './components/question-templates/details/details.component';
import {PaymentDetailsComponent} from './components/payment-details/payment-details.component';
import {QuestionTemplatesComponent} from './components/question-templates/question-templates.component';
import {MapDialogComponent} from './shared/map-dialog/map-dialog.component';
import { LocationCustomersComponent } from './components/reports/location-customers/location-customers.component';

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
    CusComponent,
    DetailsCusComponent,
    CustomerDialogComponent,
    TypesChartComponent,
    ContactDialogueComponent,
    CreateAssignmentDialogComponent,
    UserDetailsComponent,
    TypeDialogComponent,
    CityDialogComponent,
    AssignNewCustomerDialogComponent,
    HomeComponent,
    TopBarComponent,
    MidBarComponent,
    LineGraphComponent,
    UserPerformanceComponent,
    LoginComponent,
    BotBarComponent,
    SpecificUserComponent,
    CustomerPerformanceComponent,
    PaymentDetailsComponent,
    QuestionTemplatesComponent,
    DetailsComponent,
    MapDialogComponent,
    LocationCustomersComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
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
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    CanvasJSAngularChartsModule,
    MatLegacyChipsModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatLineModule,
    GoogleMapsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatRadioModule,

  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        width: '40%'
      }
    },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
