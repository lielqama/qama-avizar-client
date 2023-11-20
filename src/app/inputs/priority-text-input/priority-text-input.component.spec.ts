import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriorityTextInputComponent } from './priority-text-input.component';

describe('PriorityTextInputComponent', () => {
  let component: PriorityTextInputComponent;
  let fixture: ComponentFixture<PriorityTextInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityTextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
