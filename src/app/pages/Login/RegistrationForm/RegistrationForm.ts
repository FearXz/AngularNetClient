import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: '[component="RegistrationForm"]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './RegistrationForm.html',
})
export class RegistrationForm implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        cognome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        cellulare: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confermaPassword: ['', [Validators.required, confirmPasswordValidator]],
        indirizzi: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
        ],
        cap: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        citta: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      },
      { validator: confirmPasswordValidator }
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
    }
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  const password = formGroup.get('password');
  const confermaPassword = formGroup.get('confermaPassword');
  if (!password || !confermaPassword) {
    return null;
  }
  if (password.value == confermaPassword.value) return null;
  else return { confermaPassword: true };
};
