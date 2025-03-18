import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDataComponent } from './book-data.component';

describe('BookDataComponent', () => {
  let component: BookDataComponent;
  let fixture: ComponentFixture<BookDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
