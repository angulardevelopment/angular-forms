import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
} from '@angular/core';
import { Router, Routes, RouterLink, RouterOutlet } from '@angular/router';
import { MyCheckbox } from './my-checkbox/my-checkbox';
import { form, FormField } from "@angular/forms/signals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet, MyCheckbox, FormField],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'forms';
  routes: Routes = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  // get checkCD() {
  //   console.log('Change detection executed for this template!');
  //   return '';
  // }
  ngAfterViewInit(): void {
    // Fetch the routes from the router
    this.routes = this.router.config;
    console.log(this.routes);
    this.cdr.detectChanges();
  }

  myFormData = signal({agreeToTerms: false})
    myForm = form(this.myFormData);
}
