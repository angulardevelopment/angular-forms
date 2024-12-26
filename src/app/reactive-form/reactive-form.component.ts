import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {

  empForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.empForm = this.fb.group({
      employees: this.fb.array([this.newEmployee()]),
    });
    this.myForm = this.fb.group({
      items: this.fb.array([]),
    });
    // Immutable State Management
    // When you use methods like `setValue()` or `patchValue()`, you're effectively creating a new state for the form control:
    // to set default value in form in particular index
    // this.employees().at(0).setValue(
    // 	{ lastName: "a", firstName: "b", skills: []}
    // );

    // to set all default value in form
    // this.employees().setValue([
    // 	{ lastName: "a", firstName: "b", skills: []}
    // ]);

    // to set particular value in form
    // this.employees().patchValue([
    //   { lastName: "g" },
    // ]);

    // to track changes in form
    this.empForm.valueChanges.subscribe(data => console.log(data, 'valueChanges'));
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '' ,
      // To add validation
      // firstName: new FormControl({ value: '', disabled: true }) ,
      lastName: '',
      skills: this.fb.array([])
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
      level: ''
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  onSubmit() {
    console.log(this.empForm.value,this.empForm.valid, 'value');
  }

  myForm: FormGroup;


  // access the form array using the getter:
  // better management of dynamic form structures
  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.control(''));
  }
}
