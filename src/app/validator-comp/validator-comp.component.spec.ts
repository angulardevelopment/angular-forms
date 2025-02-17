import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorCompComponent } from './validator-comp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ValidatorCompComponent', () => {
  let component: ValidatorCompComponent;
  let fixture: ComponentFixture<ValidatorCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorCompComponent ],
      imports: [FormsModule,ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
