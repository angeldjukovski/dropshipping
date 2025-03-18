import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenFileComponent } from './children-file.component';

describe('ChildrenFileComponent', () => {
  let component: ChildrenFileComponent;
  let fixture: ComponentFixture<ChildrenFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrenFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
