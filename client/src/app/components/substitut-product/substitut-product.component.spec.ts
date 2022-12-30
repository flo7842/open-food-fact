import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutProductComponent } from './substitut-product.component';

describe('SubstitutProductComponent', () => {
  let component: SubstitutProductComponent;
  let fixture: ComponentFixture<SubstitutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstitutProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
