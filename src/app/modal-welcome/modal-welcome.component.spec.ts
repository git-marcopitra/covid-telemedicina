import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWelcomeComponent } from './modal-welcome.component';

describe('ModalWelcomeComponent', () => {
  let component: ModalWelcomeComponent;
  let fixture: ComponentFixture<ModalWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
