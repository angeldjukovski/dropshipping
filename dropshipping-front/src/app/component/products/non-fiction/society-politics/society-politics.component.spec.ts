import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyPoliticsComponent } from './society-politics.component';

describe('SocietyPoliticsComponent', () => {
  let component: SocietyPoliticsComponent;
  let fixture: ComponentFixture<SocietyPoliticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietyPoliticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocietyPoliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
