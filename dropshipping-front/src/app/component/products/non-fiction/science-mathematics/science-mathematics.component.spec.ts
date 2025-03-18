import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceMathematicsComponent } from './science-mathematics.component';

describe('ScienceMathematicsComponent', () => {
  let component: ScienceMathematicsComponent;
  let fixture: ComponentFixture<ScienceMathematicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScienceMathematicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScienceMathematicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
