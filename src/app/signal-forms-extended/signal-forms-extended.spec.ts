import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormsExtended } from './signal-forms-extended';

describe('SignalFormsExtended', () => {
  let component: SignalFormsExtended;
  let fixture: ComponentFixture<SignalFormsExtended>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsExtended]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormsExtended);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
