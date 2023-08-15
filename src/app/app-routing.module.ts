import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component'; // Import your UserComponent
import {CustomerComponent} from "./components/customer/customer.component";
import {AddComponent} from "./components/customer/add/add.component";
import {DetailsComponent} from "./components/customer/details/details.component";
import {EditComponent} from "./components/customer/edit/edit.component";
import {DefinitionComponent} from "./components/definition/definition.component";
import {DetailsDefComponent} from "./components/definition/details-def/details-def.component";
import {AddDefComponent} from "./components/definition/add-def/add-def.component";

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'customer', component: CustomerComponent },
  {path: 'add',component:AddComponent},
  {path: 'details/:id',component:DetailsComponent},
  {path: 'details-def/:id',component:DetailsDefComponent},
  {path: 'edit/:id',component:EditComponent},
  {path: 'definition',component:DefinitionComponent},
  {path: 'add-def',component:AddDefComponent},


  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
