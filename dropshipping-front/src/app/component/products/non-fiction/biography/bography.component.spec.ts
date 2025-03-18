import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BographyComponent } from './bography.component';

describe('BographyComponent', () => {
  let component: BographyComponent;
  let fixture: ComponentFixture<BographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
