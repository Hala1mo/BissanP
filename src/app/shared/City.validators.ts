import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cityValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return { required: true }; // Validation error if the city field is empty
  }

  // Additional validation logic for the city field, if needed

  return null; // Validation successful
}
