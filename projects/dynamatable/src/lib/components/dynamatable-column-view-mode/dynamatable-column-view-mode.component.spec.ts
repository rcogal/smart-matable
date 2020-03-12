import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnViewModeComponent } from './dynamatable-column-view-mode.component';

describe('DynamatableColumnViewModeComponent', () => {
  let component: DynamatableColumnViewModeComponent;
  let fixture: ComponentFixture<DynamatableColumnViewModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnViewModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnViewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
