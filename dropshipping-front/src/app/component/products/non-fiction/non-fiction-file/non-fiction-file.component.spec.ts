import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFictionFileComponent } from './non-fiction-file.component';

describe('NonFictionFileComponent', () => {
  let component: NonFictionFileComponent;
  let fixture: ComponentFixture<NonFictionFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonFictionFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonFictionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
