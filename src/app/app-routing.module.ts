import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './components/user/user.component'; // Import your UserComponent
import {CustomerComponent} from "./components/customer/customer.component";
import {AddCustomerComponent} from "./components/customer/add/add-customer.component";
import {CustomerDetailsComponent} from "./components/customer/details/customer-details.component";
import {EditCustomerComponent} from "./components/customer/edit/edit-customer.component";
import {DefinitionComponent} from "./components/definition/definition.component";
import {DefinitionDetailsComponent} from "./components/definition/details-def/definition-details.component";
import {AddDefinitionComponent} from "./components/definition/add-def/add-definition.component";
import {EditDefinitionComponent} from "./components/definition/edit-def/edit-definition.component";
import {AssignmentDetailsComponent} from "./components/assignments/assignment-details.component";
import {AddUserComponent} from "./components/user/add/add-user.component";

const routes: Routes = [
    {path: 'users', component: UserComponent},
    {path: 'customers', component: CustomerComponent},
    {path: 'definitions', component: DefinitionComponent},

    {path: 'customers/add', component: AddCustomerComponent},
    {path: 'definitions/add', component: AddDefinitionComponent},
    {path: 'users/add', component: AddUserComponent},

    {path: 'customers/:id', component: CustomerDetailsComponent},
    {path: 'definitions/:id', component: DefinitionDetailsComponent},
    {path: 'assignments/:id', component: AssignmentDetailsComponent},

    {path: 'customers/edit/:id', component: EditCustomerComponent},
    {path: 'definitions/edit/:id', component: EditDefinitionComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
