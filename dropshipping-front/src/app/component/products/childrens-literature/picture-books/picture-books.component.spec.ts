import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureBooksComponent } from './picture-books.component';

describe('PictureBooksComponent', () => {
  let component: PictureBooksComponent;
  let fixture: ComponentFixture<PictureBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
