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

import { Component, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  template: `
    <form (submit)="onSubmit($event)">
      <input type="email" [formField]="loginForm.email" />
      @if (loginForm.email().touched() && loginForm.email().invalid()) {
        @for (error of loginForm.email().errors(); track error) {
          <p class="error">{{ error.message }}</p>
        }
      }
      <input type="password" [formField]="loginForm.password" />
      <button type="submit" [disabled]="loginForm().invalid()">Log In</button>
    </form>
  `
})
export class LoginComponent {
  loginModel = signal<LoginData>({ email: '', password: '' });

  loginForm = form(this.loginModel, (f) => {
    required(f.email, { message: 'Email is required' });
    email(f.email, { message: 'Please enter a valid email' });
    required(f.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      console.log(this.loginModel());
    }
  }
}