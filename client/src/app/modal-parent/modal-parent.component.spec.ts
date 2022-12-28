import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParentComponent } from './modal-parent.component';

describe('ModalParentComponent', () => {
  let component: ModalParentComponent;
  let fixture: ComponentFixture<ModalParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
