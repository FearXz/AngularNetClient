import { Component } from '@angular/core';
import { RegisterForm } from './component/RegisterForm';

@Component({
  selector: 'RegisterPage',
  standalone: true,
  imports: [RegisterForm],
  templateUrl: './RegisterPage.html',
})
export class RegisterPage {
  constructor() {}
}
