import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPasswordRescueComponent } from './modal-password-rescue.component';

describe('ModalPasswordRescueComponent', () => {
  let component: ModalPasswordRescueComponent;
  let fixture: ComponentFixture<ModalPasswordRescueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPasswordRescueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPasswordRescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
