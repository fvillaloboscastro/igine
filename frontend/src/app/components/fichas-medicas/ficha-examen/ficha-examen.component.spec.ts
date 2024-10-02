import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaExamenComponent } from './ficha-examen.component';

describe('FichaExamenComponent', () => {
  let component: FichaExamenComponent;
  let fixture: ComponentFixture<FichaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
