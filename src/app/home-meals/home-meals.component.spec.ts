import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMealsComponent } from './home-meals.component';

describe('HomeMealsComponent', () => {
  let component: HomeMealsComponent;
  let fixture: ComponentFixture<HomeMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
