import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomerDetailsComponent} from "./components/customer/details/customer-details.component";
import {DefinitionComponent} from "./components/definition/definition.component";
import {DefinitionDetailsComponent} from "./components/definition/definition-details/definition-details.component";
import {AssignmentDetailsComponent} from "./components/assignments/assignment-details.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {StatusComponent} from "./components/reports/status/status.component";
import {DateComponent} from "./components/reports/date/date.component";
import {UserDetailsComponent} from "./components/user/user-details/user-details.component";
import {HomeComponent} from "./components/home/home.component";
import {SpecificUserComponent} from "./components/reports/specific-user/specific-user.component";
import {UserPerformanceComponent} from "./components/reports/user-performance/user-performance.component";
import {CustomerPerformanceComponent} from "./components/reports/customer-performance/customer-performance.component";
import {PaymentDetailsComponent} from "./components/payment-details/payment-details.component";
import {QuestionTemplatesComponent} from "./components/question-templates/question-templates.component";
import {DetailsComponent} from "./components/question-templates/details/details.component";
import {AuthService} from "./services/auth.service";
import {map} from "rxjs";
import {LocationCustomersComponent} from "./components/reports/location-customers/location-customers.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'definitions',
    component: DefinitionComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'users/:username',
    component: UserDetailsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'definitions/:id',
    component: DefinitionDetailsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'assignments/:id',
    component: AssignmentDetailsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },

  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'reports/status',
    component: StatusComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'reports/date',
    component: DateComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'reports/user-performance',
    component: UserPerformanceComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'reports/user-detailed',
    component: SpecificUserComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'reports/customer-performance',
    component: CustomerPerformanceComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'documents/payment',
    component: PaymentDetailsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'documents/question-templates',
    component: QuestionTemplatesComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'documents/question-templates/:id',
    component: DetailsComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    ]
  },
  {
    path: 'reports/location-customers',
    component: LocationCustomersComponent,
    // canActivate: [
    //   () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => isAuth))
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
