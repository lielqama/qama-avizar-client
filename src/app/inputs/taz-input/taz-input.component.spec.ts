import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TazInputComponent } from './taz-input.component';

describe('TazInputComponent', () => {
  let component: TazInputComponent;
  let fixture: ComponentFixture<TazInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TazInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TazInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
