import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleBooksComponent } from './puzzle-books.component';

describe('PuzzleBooksComponent', () => {
  let component: PuzzleBooksComponent;
  let fixture: ComponentFixture<PuzzleBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
