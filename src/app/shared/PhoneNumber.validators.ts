import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern = /^[0-9]*$/; // Only allows digits
    const isValid = phoneNumberPattern.test(control.value);
    return isValid ? null : { phoneNumberInvalid: true };
  };
}
