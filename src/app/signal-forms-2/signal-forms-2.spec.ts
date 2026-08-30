import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalForms2 } from './signal-forms-2';

describe('SignalForms2', () => {
  let component: SignalForms2;
  let fixture: ComponentFixture<SignalForms2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalForms2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalForms2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
