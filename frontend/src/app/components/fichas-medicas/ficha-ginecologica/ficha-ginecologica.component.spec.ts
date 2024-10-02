import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaGinecologicaComponent } from './ficha-ginecologica.component';

describe('FichaGinecologicaComponent', () => {
  let component: FichaGinecologicaComponent;
  let fixture: ComponentFixture<FichaGinecologicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaGinecologicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaGinecologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
