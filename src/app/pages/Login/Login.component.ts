import { Component } from '@angular/core';
import { LoginForm } from './LoginForm/LoginForm';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [LoginForm, RegistrationForm],
  templateUrl: './Login.component.html',
})
export class LoginPage {
  title = 'LOGIN';
}
