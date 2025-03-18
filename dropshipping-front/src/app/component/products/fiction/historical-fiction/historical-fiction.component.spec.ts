import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalFictionComponent } from './historical-fiction.component';

describe('HistoricalFictionComponent', () => {
  let component: HistoricalFictionComponent;
  let fixture: ComponentFixture<HistoricalFictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalFictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalFictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
