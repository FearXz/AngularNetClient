import { Component } from '@angular/core';
import { LoginForm } from './LoginForm/LoginForm';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [LoginForm, RegistrationForm],
  templateUrl: './LoginPage.html',
})
export class LoginPage {
  title = 'LOGIN';
  constructor(private titleSvc: Title) {
    this.titleSvc.setTitle('Accedi al tuo account  | Take2Me');
  }
}
