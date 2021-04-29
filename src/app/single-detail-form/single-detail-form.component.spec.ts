import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDetailFormComponent } from './single-detail-form.component';

describe('SingleDetailFormComponent', () => {
  let component: SingleDetailFormComponent;
  let fixture: ComponentFixture<SingleDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
