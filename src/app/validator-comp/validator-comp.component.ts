import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../forbidden-name.directive';

@Component({
  selector: 'app-validator-comp',
  templateUrl: './validator-comp.component.html',
  styleUrls: ['./validator-comp.component.scss']
})
export class ValidatorCompComponent implements OnInit {
  heroForm: FormGroup;
  hero = {name:'', alterEgo: '', power: ''}
  constructor() { }



  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
      ]),
      alterEgo: new FormControl(this.hero.alterEgo),
      power: new FormControl(this.hero.power, Validators.required),
    }, { validators: identityRevealedValidator });
  }

  get name() {
    return this.heroForm.get('name');
  }

  get power() {
    return this.heroForm.get('power');
  }
}

/** A hero's name can't match the hero's alter ego */
export const identityRevealedValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');

  return name && alterEgo && name.value === alterEgo.value
    ? { identityRevealed: true }
    : null;
};



