import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const forbidden = nameRe.test(control.value);
    const forbidden = !(control.value.indexOf('cisco') != -1);

    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
