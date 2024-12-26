import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm,
  ValidatorFn,
  AbstractControl,
  ValidationErrors, UntypedFormGroup, UntypedFormControl
} from '@angular/forms';
import { concatMap, takeUntil } from 'rxjs/operators';
import { forbiddenNameValidator } from './validator';

@Component({
  selector: 'app-single-detail-form',
  templateUrl: './single-detail-form.component.html',
  styleUrls: ['./single-detail-form.component.scss'],
})
export class SingleDetailFormComponent implements OnInit {
  game = '';
  favoriteColorControl = new FormControl('');
  destroy$;
  // explicitly define the structure and behavior of your form using the `FormGroup`, `FormControl`, and `FormArray` classes. This means you manually create the form controls and set their initial values, validators, and other configurations.
  myGroup: FormGroup;
  taxForm: FormGroup;
  myForm: UntypedFormGroup;

  get purchasepricetaxes() {
    return this.taxForm.get('purchasepricetaxes');
  }
  get txtvalue() {
    return this.taxForm.get('txtvalue');
  }

  constructor(private fb: FormBuilder) {
    // create a form without strict typing.
    this.myForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
    });
  }

  // good way of declaration
  readonly controls = {
    gameControl: new FormControl(),
  };
  readonly myGroup2 = new FormGroup(this.controls);

  //  initialize the form it is mandatory to assign default values.
  ngOnInit(): void {
    this.createGroupFormControls();
    this.createTaxFormControls();

    this.trackTaxFormChanges();
  }

  createGroupFormControls(){
    // Explicit State Management
       //   this.myGroup = new FormGroup({
    //     gameControl: new FormControl()
    //  });
    // 'displayName': new FormControl<string>('', Validators.required), // typed forms in new versions

    this.myGroup = this.fb.group({
      gameControl: [
        '',
        {
          validators: [forbiddenNameValidator()],
          updateOn: 'change',
        },
      ],
    });
  }

  createTaxFormControls(){
       this.taxForm = this.fb.group({
      // purchaseprice:  '',
      purchaseprice: ['', Validators.required],
      taxes: '21',
      // email: ['', [Validators.required, Validators.email]],

      purchasepricetaxes: new FormControl('', Validators.required),
      txtvalue: new FormControl('', [
        Validators.minLength(4),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
    });
  }

  trackTaxFormChanges(){
       // single form changes
    // this.taxForm
    //   .get('purchaseprice')
    //   .valueChanges.subscribe((data) => console.log(data, 'valueChanges'));

    /** Listen  entire form  changes */
    // this.taxForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   console.log(this.taxForm.value);
    // });

//      concatMap is taking each form value and transforming it
// into a save HTTP Observable, called an inner Observable
// concatMap then subscribes to the inner Observable and
// sends its output to the result Observable
// a second form value might come faster than what it takes
// to save the previous form value in the backend
// If that happens, that new form value will not be
// immediately mapped to an HTTP request
// instead, concatMap will wait for previous HTTP
// Observable to complete before mapping the new value to
// an HTTP Observable, subscribing to it and therefore
// triggering the next save
    this.taxForm.valueChanges.pipe(concatMap(value => {
      console.log(value, 'value');
      return value;
    })).subscribe((res)=>{console.log(res), (err)=>{console.log(err)}})

    // this.taxForm.statusChanges.subscribe((data) =>
    //   console.log(data, 'statusChanges')
    // );
  }

  submittedValues() {
    console.log(
      this.game,
      this.myGroup.get('gameControl').value,
      this.favoriteColorControl.value,
      'game'
    );
  }

  calculatePurchasePriceTaxes() {
    return this.taxForm.value.purchasepricetaxes + +this.taxForm.value.taxes;
  }

  submitTax(f) {
    console.log(f, 'submitTax');
  }



  onSubmit() {
    console.log(this.myForm.value);
  }
}

