import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { LoginRequest } from '../../../auth/Interfaces/LoginRequest';

@Component({
  selector: 'LoginForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './LoginForm.html',
})
export class LoginForm implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private authSvc: AuthService) {}

  scrollToDiv(event: Event, divId: string) {
    event.preventDefault();
    const element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      let logReq: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authSvc.login(logReq);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
