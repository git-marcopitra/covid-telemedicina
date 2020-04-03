import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignInComponent } from './modal-sign-in.component';

describe('ModalSignInComponent', () => {
  let component: ModalSignInComponent;
  let fixture: ComponentFixture<ModalSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
