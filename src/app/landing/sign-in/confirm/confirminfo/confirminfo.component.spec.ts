import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirminfoComponent } from './confirminfo.component';

describe('ConfirminfoComponent', () => {
  let component: ConfirminfoComponent;
  let fixture: ComponentFixture<ConfirminfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirminfoComponent]
    });
    fixture = TestBed.createComponent(ConfirminfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
