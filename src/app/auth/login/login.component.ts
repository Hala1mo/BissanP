import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;
  username: string = '';
  isSigningIn: boolean = false;

  signIn() {
    if (this.isSigningIn) return
    this.isSigningIn = true;

    console.log("SIGNING IN")
  }
}
