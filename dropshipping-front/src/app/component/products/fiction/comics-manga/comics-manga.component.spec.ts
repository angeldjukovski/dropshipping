import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsMangaComponent } from './comics-manga.component';

describe('ComicsMangaComponent', () => {
  let component: ComicsMangaComponent;
  let fixture: ComponentFixture<ComicsMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicsMangaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicsMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
