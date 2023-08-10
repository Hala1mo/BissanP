import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component'; // Import your UserComponent
import {CustomerComponent} from "./customer/customer.component";
import {AddComponent} from "./customer/add/add.component";
import {DetailsComponent} from "./customer/details/details.component";
import {EditComponent} from "./customer/edit/edit.component";

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'customer', component: CustomerComponent },
  {path: 'add',component:AddComponent},
  {path: 'details/:id',component:DetailsComponent},
  {path: 'edit/:id',component:EditComponent}

  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
