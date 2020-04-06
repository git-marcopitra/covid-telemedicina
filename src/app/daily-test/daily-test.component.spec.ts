import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTestComponent } from './daily-test.component';

describe('TestComponent', () => {
  let component: DailyTestComponent;
  let fixture: ComponentFixture<DailyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
