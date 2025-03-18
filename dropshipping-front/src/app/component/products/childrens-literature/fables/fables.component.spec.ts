import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FablesComponent } from './fables.component';

describe('FablesComponent', () => {
  let component: FablesComponent;
  let fixture: ComponentFixture<FablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
