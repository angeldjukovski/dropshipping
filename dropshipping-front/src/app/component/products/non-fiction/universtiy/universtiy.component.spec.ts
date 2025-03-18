import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverstiyComponent } from './universtiy.component';

describe('UniverstiyComponent', () => {
  let component: UniverstiyComponent;
  let fixture: ComponentFixture<UniverstiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverstiyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniverstiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
