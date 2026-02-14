import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Populardest } from './populardest';

describe('Populardest', () => {
  let component: Populardest;
  let fixture: ComponentFixture<Populardest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Populardest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Populardest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
