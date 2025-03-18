import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtFashionComponent } from './art-fashion.component';

describe('ArtFashionComponent', () => {
  let component: ArtFashionComponent;
  let fixture: ComponentFixture<ArtFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtFashionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
