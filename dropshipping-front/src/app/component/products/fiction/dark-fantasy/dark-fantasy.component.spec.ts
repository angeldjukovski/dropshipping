import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkFantasyComponent } from './dark-fantasy.component';

describe('DarkFantasyComponent', () => {
  let component: DarkFantasyComponent;
  let fixture: ComponentFixture<DarkFantasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkFantasyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkFantasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
