import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnCellComponent } from './dynamatable-column-cell.component';

describe('DynamatableColumnCellComponent', () => {
  let component: DynamatableColumnCellComponent;
  let fixture: ComponentFixture<DynamatableColumnCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
