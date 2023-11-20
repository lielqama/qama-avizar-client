import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLogpartComponent } from './show-logpart.component';

describe('AddLogpartComponent', () => {
  let component: AddLogpartComponent;
  let fixture: ComponentFixture<AddLogpartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLogpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
