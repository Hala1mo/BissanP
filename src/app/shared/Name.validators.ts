import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null; // No validation error if the field is empty
  }

  const nameRegex = /^[A-Za-z0-9\s.]+$/; // Allow alphabetic characters, numbers, spaces, and periods

  if (!nameRegex.test(value)) {
    return { invalidName: true }; // Validation error if the input contains non-allowed characters
  }

  return null; // Validation successful
}


export function telValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null; // No validation error if the field is empty
  }

  const phoneNumberRegex = /^[0-9()\s-]*$/; // Allow digits, (), -, and spaces

  if (!phoneNumberRegex.test(value)) {
    return { phoneNumberInvalid: true }; // Validation error if the input contains non-allowed characters
  }

  return null; // Validation successful
}
