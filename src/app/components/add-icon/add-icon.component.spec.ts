import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddIconComponent } from './add-icon.component';

describe('AddIconComponent', () => {
  let component: AddIconComponent;
  let fixture: ComponentFixture<AddIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
