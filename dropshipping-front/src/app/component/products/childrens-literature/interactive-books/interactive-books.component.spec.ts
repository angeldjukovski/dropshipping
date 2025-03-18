import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveBooksComponent } from './interactive-books.component';

describe('InteractiveBooksComponent', () => {
  let component: InteractiveBooksComponent;
  let fixture: ComponentFixture<InteractiveBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
