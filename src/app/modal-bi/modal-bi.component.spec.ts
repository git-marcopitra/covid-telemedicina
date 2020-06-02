import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBiComponent } from './modal-bi.component';

describe('ModalBiComponent', () => {
  let component: ModalBiComponent;
  let fixture: ComponentFixture<ModalBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
