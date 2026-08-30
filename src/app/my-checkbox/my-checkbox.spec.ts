import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCheckbox } from './my-checkbox';

describe('MyCheckbox', () => {
  let component: MyCheckbox;
  let fixture: ComponentFixture<MyCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
