import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SingleDetailFormComponent } from './single-detail-form/single-detail-form.component';
import { ThemeComponent } from './theme/theme.component';
import { ValidatorCompComponent } from './validator-comp/validator-comp.component';

const routes: Routes = [{
  path: 'ReactiveFormComponent',
  component: ReactiveFormComponent
}, {
  path: 'SingleDetailFormComponent',
  component: SingleDetailFormComponent
} , {
  path: 'ThemeComponent',
  component: ThemeComponent
}, {
  path: 'ValidatorComponent',
  component: ValidatorCompComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
