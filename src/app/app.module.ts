import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleDetailFormComponent } from './single-detail-form/single-detail-form.component';
import { ThemeComponent } from './theme/theme.component';
import { ValidateDirective } from './validate.directive';
import { ValidatorCompComponent } from './validator-comp/validator-comp.component';
import { ForbiddenNameDirective } from './forbidden-name.directive';
import { AsyncValidatorDirective } from './validator-comp/appAsyncValidator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    SingleDetailFormComponent,
    ThemeComponent,
    ValidateDirective,
    ValidatorCompComponent,
    ForbiddenNameDirective,
    AsyncValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
