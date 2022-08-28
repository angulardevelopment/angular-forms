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

  // it('should update the favorite color in the component', fakeAsync(() => {
  //   const input = fixture.nativeElement.querySelector('input');
  //   const event = createNewEvent('input');

  //   input.value = 'Red';
  //   input.dispatchEvent(event);

  //   fixture.detectChanges();

  //   expect(component.favoriteColor).toEqual('Red');
  // }));

  // it('should update the value of the input field', () => {
  //   const input = fixture.nativeElement.querySelector('input');
  //   const event = createNewEvent('input');
  
  //   input.value = 'Red';
  //   input.dispatchEvent(event);
  
  //   expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
  // });

  it('should update the value in the control', () => {
    component.favoriteColorControl.setValue('Blue');
  
    const input = fixture.nativeElement.querySelector('input');
  
    expect(input.value).toBe('Blue');
  });
});
