import { Component, model } from '@angular/core';

@Component({
  selector: 'my-checkbox',
  imports: [],
  templateUrl: './my-checkbox.html',
  styleUrl: './my-checkbox.scss',
})
export class MyCheckbox {
 readonly checked = model(false);
}
