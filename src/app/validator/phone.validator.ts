import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneRegex = /^[0-9]{6,15}$/; // Adjust regex for your requirements
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}
