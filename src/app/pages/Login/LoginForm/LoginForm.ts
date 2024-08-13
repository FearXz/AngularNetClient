import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'LoginForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './LoginForm.html',
})
export class LoginForm implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  scrollToDiv(event: Event, divId: string) {
    event.preventDefault();
    const element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
