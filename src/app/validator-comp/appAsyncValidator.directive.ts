import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// custom asynchronous validator directive
// his allows you to perform validation that may require asynchronous checks, such as verifying data against a server.
@Directive({
  selector: '[appAsyncValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncValidatorDirective,
      multi: true
    }
  ]
})
export class AsyncValidatorDirective {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.checkAsync(control.value).pipe(
      map(isValid => (isValid ? null : { asyncError: true })),
      catchError(() => of(null)) // Handle error and return null
    );
  }

  private checkAsync(value: string): Observable<boolean> {
    // Replace with your async validation logic (e.g., HTTP request)
    return of(value !== 'invalid'); // Example: Invalid if value is 'invalid'
  }
}