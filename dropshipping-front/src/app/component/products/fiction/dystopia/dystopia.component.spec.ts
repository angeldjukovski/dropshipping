import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DystopiaComponent } from './dystopia.component';

describe('DystopiaComponent', () => {
  let component: DystopiaComponent;
  let fixture: ComponentFixture<DystopiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DystopiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DystopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
