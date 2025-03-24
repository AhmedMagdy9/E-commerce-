import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcatComponent } from './productcat.component';

describe('ProductcatComponent', () => {
  let component: ProductcatComponent;
  let fixture: ComponentFixture<ProductcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductcatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
