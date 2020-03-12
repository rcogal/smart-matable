import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnNumberComponent } from './dynamatable-column-number.component';

describe('DynamatableColumnNumberComponent', () => {
  let component: DynamatableColumnNumberComponent;
  let fixture: ComponentFixture<DynamatableColumnNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
