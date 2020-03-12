import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnHeaderComponent } from './dynamatable-column-header.component';

describe('DynamatableColumnHeaderComponent', () => {
  let component: DynamatableColumnHeaderComponent;
  let fixture: ComponentFixture<DynamatableColumnHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
