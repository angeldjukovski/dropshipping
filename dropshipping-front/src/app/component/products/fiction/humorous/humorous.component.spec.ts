import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumorousComponent } from './humorous.component';

describe('HumorousComponent', () => {
  let component: HumorousComponent;
  let fixture: ComponentFixture<HumorousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumorousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumorousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
