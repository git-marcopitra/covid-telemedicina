import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicinaComponent } from './telemedicina.component';

describe('TelemedicinaComponent', () => {
  let component: TelemedicinaComponent;
  let fixture: ComponentFixture<TelemedicinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelemedicinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
