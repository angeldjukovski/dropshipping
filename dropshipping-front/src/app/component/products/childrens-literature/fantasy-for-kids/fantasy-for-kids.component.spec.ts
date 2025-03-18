import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyForKidsComponent } from './fantasy-for-kids.component';

describe('FantasyForKidsComponent', () => {
  let component: FantasyForKidsComponent;
  let fixture: ComponentFixture<FantasyForKidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyForKidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FantasyForKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
