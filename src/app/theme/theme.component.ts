import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this, 'theme');
  }

  @ViewChild('headchange') header;
  @ViewChild('myForm') myForm: NgForm;
  
    onSubmit(form) {
      console.log(form.value, 'global');
      const stylesheet =  form.value;

      if (stylesheet.globalNavColor) {
        this.header.nativeElement.style.backgroundColor = stylesheet.globalNavColor;
    }
    }

    checkEmailValue() {
          // Check if the entire form is valid
      console.log(this.myForm.valid);
          // Check if the email control is valid and log errors if any
    const emailControl = this.myForm.controls['email'];
    console.log('Email control valid:', emailControl.valid);
    console.log('Email control errors:', emailControl.errors);
      const emailValue = this.myForm.controls['email'].value;
      console.log(emailValue);
    }

    checkValidationStatus() {
      console.log(this.myForm.controls['email'].status);
    }


}
