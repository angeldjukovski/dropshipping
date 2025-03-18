import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLawComponent } from './business-law.component';

describe('BusinessLawComponent', () => {
  let component: BusinessLawComponent;
  let fixture: ComponentFixture<BusinessLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessLawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
