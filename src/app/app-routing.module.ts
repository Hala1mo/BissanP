import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component'; // Import your UserComponent
import {CustomerComponent} from "./customer/customer.component";

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'customer', component: CustomerComponent }

  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
