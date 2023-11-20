import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityBoolInputComponent } from './priority-bool-input.component';

describe('PriorityBoolInputComponent', () => {
  let component: PriorityBoolInputComponent;
  let fixture: ComponentFixture<PriorityBoolInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityBoolInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityBoolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
