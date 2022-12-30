import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritProductComponent } from './favorit-product.component';

describe('FavoritProductComponent', () => {
  let component: FavoritProductComponent;
  let fixture: ComponentFixture<FavoritProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
