import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceGeographyComponent } from './science-geography.component';

describe('ScienceGeographyComponent', () => {
  let component: ScienceGeographyComponent;
  let fixture: ComponentFixture<ScienceGeographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScienceGeographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScienceGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
