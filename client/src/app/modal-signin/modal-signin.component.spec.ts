import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignin } from './modal-signin.component';

describe('ModalSignin', () => {
  let component: ModalSignin;
  let fixture: ComponentFixture<ModalSignin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSignin ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
