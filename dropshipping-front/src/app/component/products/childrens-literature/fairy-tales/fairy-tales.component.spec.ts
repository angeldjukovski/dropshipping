import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairyTalesComponent } from './fairy-tales.component';

describe('FairyTalesComponent', () => {
  let component: FairyTalesComponent;
  let fixture: ComponentFixture<FairyTalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FairyTalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairyTalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
