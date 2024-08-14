import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import {} from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { LoginRequest } from '../../../Interfaces/LoginRequest';

@Component({
  selector: 'LoginForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './LoginForm.html',
})
export class LoginForm {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.authSvc.login(loginRequest.email, loginRequest.password);
    }
  }
}
