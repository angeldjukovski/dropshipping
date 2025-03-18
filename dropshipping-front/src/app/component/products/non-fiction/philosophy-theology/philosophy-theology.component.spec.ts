import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilosophyTheologyComponent } from './philosophy-theology.component';

describe('PhilosophyTheologyComponent', () => {
  let component: PhilosophyTheologyComponent;
  let fixture: ComponentFixture<PhilosophyTheologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhilosophyTheologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilosophyTheologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
