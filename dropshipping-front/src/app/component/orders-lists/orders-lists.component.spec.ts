import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListsComponent } from './orders-lists.component';

describe('OrdersListsComponent', () => {
  let component: OrdersListsComponent;
  let fixture: ComponentFixture<OrdersListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
