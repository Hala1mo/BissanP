import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './components/user/user.component'; // Import your UserComponent
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomerDetailsComponent} from "./components/customer/details/customer-details.component";
import {DefinitionComponent} from "./components/definition/definition.component";
import {DefinitionDetailsComponent} from "./components/definition/definition-details/definition-details.component";
import {AssignmentDetailsComponent} from "./components/assignments/assignment-details.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {StatusComponent} from "./components/reports/status/status.component";
import {DateComponent} from "./components/reports/date/date.component";
import {TypesChartComponent} from "./components/reports/types-chart/types-chart.component";
import {UserDetailsComponent} from "./components/user/user-details/user-details.component";
import {HomeComponent} from "./components/home/home.component";
import {SpecificUserComponent} from "./components/reports/specific-user/specific-user.component";
import {UserPerformanceComponent} from "./components/reports/user-performance/user-performance.component";
import {CustomerPerformanceComponent} from "./components/reports/customer-performance/customer-performance.component";
import {PaymentDetailsComponent} from "./components/payment-details/payment-details.component";
import {QuestionTemplatesComponent} from "./components/question-templates/question-templates.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomeComponent},

  {path: 'users', component: UserComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'definitions', component: DefinitionComponent},

  {path: 'users/:username', component: UserDetailsComponent},
  {path: 'customers/:id', component: CustomerDetailsComponent},
  {path: 'definitions/:id', component: DefinitionDetailsComponent},
  {path: 'assignments/:id', component: AssignmentDetailsComponent},

  {path: 'reports', component: ReportsComponent},
  {path: 'reports/status', component: StatusComponent},
  {path: 'reports/types-chart', component: TypesChartComponent},
  {path: 'reports/date', component: DateComponent},
  {path: 'reports/user-performance', component: UserPerformanceComponent},
  {path: 'reports/user-detailed', component: SpecificUserComponent},
  {path: 'reports/customer-performance',component:CustomerPerformanceComponent},

  {path: 'documents/payment',component:PaymentDetailsComponent},
  {path: 'documents/question-templates',component:QuestionTemplatesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
