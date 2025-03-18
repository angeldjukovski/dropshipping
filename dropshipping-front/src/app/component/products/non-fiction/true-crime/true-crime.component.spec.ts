import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueCrimeComponent } from './true-crime.component';

describe('TrueCrimeComponent', () => {
  let component: TrueCrimeComponent;
  let fixture: ComponentFixture<TrueCrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueCrimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
