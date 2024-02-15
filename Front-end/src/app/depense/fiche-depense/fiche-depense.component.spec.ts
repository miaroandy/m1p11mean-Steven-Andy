import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDepenseComponent } from './fiche-depense.component';

describe('FicheDepenseComponent', () => {
  let component: FicheDepenseComponent;
  let fixture: ComponentFixture<FicheDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheDepenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FicheDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
