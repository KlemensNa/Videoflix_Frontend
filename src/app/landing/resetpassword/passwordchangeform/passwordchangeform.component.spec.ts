import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordchangeformComponent } from './passwordchangeform.component';

describe('PasswordchangeformComponent', () => {
  let component: PasswordchangeformComponent;
  let fixture: ComponentFixture<PasswordchangeformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordchangeformComponent]
    });
    fixture = TestBed.createComponent(PasswordchangeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
