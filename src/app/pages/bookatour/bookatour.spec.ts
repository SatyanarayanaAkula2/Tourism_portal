import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookatour } from './bookatour';

describe('Bookatour', () => {
  let component: Bookatour;
  let fixture: ComponentFixture<Bookatour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bookatour]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookatour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
