import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccountSettingsComponent } from './modal-account-settings.component';

describe('ModalAccountSettingsComponent', () => {
  let component: ModalAccountSettingsComponent;
  let fixture: ComponentFixture<ModalAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
