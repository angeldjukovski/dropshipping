import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicsComponent } from './classics.component';

describe('ClassicsComponent', () => {
  let component: ClassicsComponent;
  let fixture: ComponentFixture<ClassicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
