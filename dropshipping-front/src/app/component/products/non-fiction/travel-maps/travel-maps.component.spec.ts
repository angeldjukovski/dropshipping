import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelMapsComponent } from './travel-maps.component';

describe('TravelMapsComponent', () => {
  let component: TravelMapsComponent;
  let fixture: ComponentFixture<TravelMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
