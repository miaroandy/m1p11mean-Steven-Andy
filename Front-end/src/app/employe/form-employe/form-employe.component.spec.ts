import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmployeComponent } from './form-employe.component';

describe('FormEmployeComponent', () => {
  let component: FormEmployeComponent;
  let fixture: ComponentFixture<FormEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
