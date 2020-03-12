import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnEditModeComponent } from './dynamatable-column-edit-mode.component';

describe('DynamatableColumnEditModeComponent', () => {
  let component: DynamatableColumnEditModeComponent;
  let fixture: ComponentFixture<DynamatableColumnEditModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnEditModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
