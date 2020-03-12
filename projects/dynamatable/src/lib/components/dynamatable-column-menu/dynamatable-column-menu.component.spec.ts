import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnMenuComponent } from './dynamatable-column-menu.component';

describe('DynamatableColumnMenuComponent', () => {
  let component: DynamatableColumnMenuComponent;
  let fixture: ComponentFixture<DynamatableColumnMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
