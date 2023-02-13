import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartMarketingComponent } from './add-to-cart-marketing.component';

describe('AddToCartMarketingComponent', () => {
  let component: AddToCartMarketingComponent;
  let fixture: ComponentFixture<AddToCartMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartMarketingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
