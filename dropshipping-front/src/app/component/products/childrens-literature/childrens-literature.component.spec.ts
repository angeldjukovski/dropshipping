import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrensLiteratureComponent } from './childrens-literature.component';

describe('ChildrensLiteratureComponent', () => {
  let component: ChildrensLiteratureComponent;
  let fixture: ComponentFixture<ChildrensLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrensLiteratureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrensLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
