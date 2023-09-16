import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
interface AuthForm {
  username: FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hidePassword: boolean = true;
  isSigningIn: boolean = false;

  loginForm: FormGroup<AuthForm>;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
  ) {
    this.loginForm = new FormGroup<AuthForm>({
      username: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(50)],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(30)],
        nonNullable: true,
      }),
    });
  }

  signIn() {
    if (this.isSigningIn) return
    this.isSigningIn = true;

    this.authService.login(this.loginForm.value as {username: string, password: string}).subscribe({
      next: () => {
        this.dialogRef.close();
        void this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isSigningIn = false;
      }
    })
  }
}
