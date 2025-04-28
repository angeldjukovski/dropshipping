import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesListsComponent } from './deliveries-lists.component';

describe('DeliveriesListsComponent', () => {
  let component: DeliveriesListsComponent;
  let fixture: ComponentFixture<DeliveriesListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveriesListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveriesListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
