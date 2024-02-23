import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-single-detail-form',
  templateUrl: './single-detail-form.component.html',
  styleUrls: ['./single-detail-form.component.scss']
})
export class SingleDetailFormComponent implements OnInit {
  game= '';
  favoriteColorControl = new FormControl('');

  myGroup: FormGroup;
  form: FormGroup;
  get purchasepricetaxes() { return this.form.get('purchasepricetaxes'); }
  get txtvalue() { return this.form.get('txtvalue'); }
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // purchaseprice:  '',
      purchaseprice:  ['', Validators.required],
      taxes: '21',
      // email: ['', [Validators.required, Validators.email]],

      purchasepricetaxes: new FormControl('', Validators.required),
      txtvalue: new FormControl('', [
        Validators.minLength(4),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
    });

    this.form.valueChanges.subscribe(data => console.log(data, 'valueChanges'));
    this.form.statusChanges.subscribe(data => console.log(data, 'statusChanges'));

  }
//  initialize the form it is mandatory to assign default values.
  ngOnInit(): void {
  //   this.myGroup = new FormGroup({
  //     gameControl: new FormControl()
  //  });

  this.myGroup = this.fb.group({
    gameControl:  ['', {
      validators: [
        forbiddenNameValidator()
      ],
      updateOn: 'change'}],
  });
  }

  submittedValues(){
    console.log(this.game,this.myGroup.get('gameControl').value,
    this.favoriteColorControl.value, 'game')
  }

  calculatePurchasePriceTaxes() {
    return this.form.value.purchasepricetaxes + (+this.form.value.taxes);
  }

  submitTax(f) {
    console.log(f, 'submitTax');
  }


}

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const forbidden = nameRe.test(control.value);
    const forbidden = !(control.value.indexOf( "cisco" ) != -1);

    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

