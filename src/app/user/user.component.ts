import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RegistrationService } from '../registration.service';
import { PasswordValidators} from "../shared/password.validators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registrationForm!: FormGroup;
  userData: any[] = [];

  constructor(private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchUserData();

    this.registrationForm = this.fb.group({
      username: [''],
      firstName: [''],
      password: [''],
      confirmPassword:[''],
      lastName: [''],
      accessLevel:['0']
    },{validator: PasswordValidators});
  }

  fetchUserData() {
    this._registrationService.fetchUserData().subscribe(
      data => {
        console.log('Fetched user data:', data);

        this.userData = data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit() {
    console.log(this.registrationForm.value);

    this._registrationService.registerUser(this.registrationForm.value).subscribe(
      (res) => {

        console.log('Registration successful:', res);
        this.fetchUserData();

        // You can perform any additional actions upon success here
      },
      (error) => {
        console.error('Registration failed:', error);


        // You can display an error message or perform other actions upon failure here
      }
    );
  }

  updateEnabled(username: string) {
    // Implement logic to update the 'enabled' status in the database for the specific user
    // You can call a service method to update the data
    this._registrationService.updateEnabledStatus(username).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        // Fetch user data again to reflect the updated data
        this.fetchUserData();

        // You can perform any additional actions upon success here
      },
      (error) => {
        console.error('Error updating enabled status:', error);

        // You can display an error message or perform other actions upon failure here
      }
    );
  }



}
