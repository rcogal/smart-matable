import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnDateComponent } from './dynamatable-column-date.component';

describe('DynamatableColumnDateComponent', () => {
  let component: DynamatableColumnDateComponent;
  let fixture: ComponentFixture<DynamatableColumnDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
