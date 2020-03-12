import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnSelectComponent } from './dynamatable-column-select.component';

describe('DynamatableColumnSelectComponent', () => {
  let component: DynamatableColumnSelectComponent;
  let fixture: ComponentFixture<DynamatableColumnSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
