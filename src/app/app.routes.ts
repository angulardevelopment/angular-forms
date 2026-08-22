// app.routes.ts

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SingleDetailFormComponent } from './single-detail-form/single-detail-form.component';
import { ThemeComponent } from './theme/theme.component';
import { ValidatorCompComponent } from './validator-comp/validator-comp.component';
import { SignalForms } from './signal-forms/signal-forms';
import { SignalFormsExtended } from './signal-forms-extended/signal-forms-extended';

export const routes: Routes = [
  {
    path: 'ReactiveFormComponent',
    component: ReactiveFormComponent,
  },
  {
    path: 'SingleDetailFormComponent',
    component: SingleDetailFormComponent,
  },
  {
    path: 'ThemeComponent',
    component: ThemeComponent,
  },
  {
    path: 'ValidatorComponent',
    component: ValidatorCompComponent,
  },
  {
    path: 'SignalFormsComponent',
    component: SignalForms,
  },
  {
    path: 'SignalFormsExtended',
    component: SignalFormsExtended,
  }
];
