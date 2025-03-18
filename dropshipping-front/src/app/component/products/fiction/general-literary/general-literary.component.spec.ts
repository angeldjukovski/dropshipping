import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLiteraryComponent } from './general-literary.component';

describe('GeneralLiteraryComponent', () => {
  let component: GeneralLiteraryComponent;
  let fixture: ComponentFixture<GeneralLiteraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralLiteraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralLiteraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
