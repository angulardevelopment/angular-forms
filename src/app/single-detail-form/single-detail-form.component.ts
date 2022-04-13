import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-single-detail-form',
  templateUrl: './single-detail-form.component.html',
  styleUrls: ['./single-detail-form.component.scss']
})
export class SingleDetailFormComponent implements OnInit {
  game= '';

  myGroup: FormGroup;
  ngOnInit(): void {
    this.myGroup = new FormGroup({
      gameControl: new FormControl()
   });
  }

  showGame(){
    console.log(this.game,this.myGroup.get('gameControl').value, 'game')
  }

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      purchaseprice:  '',
      taxes: '21',
      purchasepricetaxes: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
    });
    this.form.valueChanges.subscribe(data => console.log(data, 'valueChanges'));
  }

  calculatePurchasePriceTaxes() {
    return this.form.value.purchasepricetaxes + (+this.form.value.taxes);

  }

  get purchasepricetaxes() { return this.form.get('purchasepricetaxes'); }
  get name() { return this.form.get('name'); }



  submit(f) {
    console.log(f, 's');
  }


}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
