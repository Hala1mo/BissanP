import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern = /^[0-9]*$/; // يسمح فقط بالأرقام
    const isValid = phoneNumberPattern.test(control.value);
    console.log("isValid", isValid);
    return isValid ? null : { phoneNumberInvalid: true };
  };
}
