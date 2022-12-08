import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscontinuedProductCardComponent } from './discontinued-product-card.component';

describe('DiscontinuedProductCardComponent', () => {
  let component: DiscontinuedProductCardComponent;
  let fixture: ComponentFixture<DiscontinuedProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscontinuedProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscontinuedProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
