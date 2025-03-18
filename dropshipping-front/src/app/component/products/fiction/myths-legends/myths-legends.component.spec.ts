import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MythsLegendsComponent } from './myths-legends.component';

describe('MythsLegendsComponent', () => {
  let component: MythsLegendsComponent;
  let fixture: ComponentFixture<MythsLegendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MythsLegendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MythsLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
