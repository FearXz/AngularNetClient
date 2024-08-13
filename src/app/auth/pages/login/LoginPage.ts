import { Component } from '@angular/core';
import { LoginForm } from './component/LoginForm';

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [LoginForm],
  templateUrl: './LoginPage.html',
})
export class LoginPage {}
