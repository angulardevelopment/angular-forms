import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-single-detail-form',
  templateUrl: './single-detail-form.component.html',
  styleUrls: ['./single-detail-form.component.scss']
})
export class SingleDetailFormComponent implements OnInit {

  ngOnInit(): void {
  }

  form: FormGroup; // create 3 form-controls (purchase price, taxes, purchase-price taxes) in this
// built in- required, requiredTrue, min, max, minLength, maxLength and pattern
  constructor(private fb: FormBuilder) {
    //  initialize the form it is mandatory to assign default values.
    this.form = this.fb.group({
      purchaseprice: new FormControl({ value: '', disabled: true }),
      taxes: '21',
      purchasepricetaxes: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
    });
    // this.form.valueChanges.subscribe(data => console.log(data, 'simple'));
  }

  calculatePurchasePriceTaxes() {
    return this.form.value.purchasepricetaxes + (+this.form.value.taxes);

  }

  get purchasepricetaxes() { return this.form.get('purchasepricetaxes'); }
  get name() { return this.form.get('name'); }



  submit(f) {
    console.log(f, 's'); // { purchasepricetaxes: 3, taxes: "21"}
  }


}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
