import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinkComponent } from './modal-link.component';

describe('ModalLinkComponent', () => {
  let component: ModalLinkComponent;
  let fixture: ComponentFixture<ModalLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
