import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputingItComponent } from './computing-it.component';

describe('ComputingItComponent', () => {
  let component: ComputingItComponent;
  let fixture: ComponentFixture<ComputingItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputingItComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputingItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
