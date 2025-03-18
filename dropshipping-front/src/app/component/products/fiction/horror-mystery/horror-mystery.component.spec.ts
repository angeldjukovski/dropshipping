import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorrorMysteryComponent } from './horror-mystery.component';

describe('HorrorMysteryComponent', () => {
  let component: HorrorMysteryComponent;
  let fixture: ComponentFixture<HorrorMysteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorrorMysteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorrorMysteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
