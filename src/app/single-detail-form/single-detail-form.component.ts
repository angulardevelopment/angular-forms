import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-detail-form',
  templateUrl: './single-detail-form.component.html',
  styleUrls: ['./single-detail-form.component.scss']
})
export class SingleDetailFormComponent implements OnInit {

  ngOnInit(): void {
  }

  form: FormGroup; // create 3 form-controls (purchase price, taxes, purchase-price taxes) in this

  constructor(private fb: FormBuilder) {
    //  initialize the form it is mandatory to assign default values.
    this.form = this.fb.group({
      purchaseprice: new FormControl({ value: '', disabled: true }),
      taxes: '21',
      purchasepricetaxes: new FormControl('', Validators.required)
    });
    // this.form.valueChanges.subscribe(data => console.log(data, 'simple'));
  }

  calculatePurchasePriceTaxes() {
    return this.form.value.purchasepricetaxes + (+this.form.value.taxes);

  }

  get purchasepricetaxes() { return this.form.get('purchasepricetaxes'); }



  submit(f) {
    console.log(f, 's'); // { purchasepricetaxes: 3, taxes: "21"}
  }


}
