import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogpartsComponent } from './logparts.component';

describe('LogpartsComponent', () => {
  let component: LogpartsComponent;
  let fixture: ComponentFixture<LogpartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogpartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogpartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
