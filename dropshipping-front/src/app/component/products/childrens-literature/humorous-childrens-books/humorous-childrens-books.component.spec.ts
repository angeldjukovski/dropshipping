import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumorousChildrensBooksComponent } from './humorous-childrens-books.component';

describe('HumorousChildrensBooksComponent', () => {
  let component: HumorousChildrensBooksComponent;
  let fixture: ComponentFixture<HumorousChildrensBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumorousChildrensBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumorousChildrensBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
