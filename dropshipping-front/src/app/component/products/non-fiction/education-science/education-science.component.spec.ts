import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationScienceComponent } from './education-science.component';

describe('EducationScienceComponent', () => {
  let component: EducationScienceComponent;
  let fixture: ComponentFixture<EducationScienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationScienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
