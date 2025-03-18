import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FictionComponent } from './fiction.component';

describe('FictionComponent', () => {
  let component: FictionComponent;
  let fixture: ComponentFixture<FictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
