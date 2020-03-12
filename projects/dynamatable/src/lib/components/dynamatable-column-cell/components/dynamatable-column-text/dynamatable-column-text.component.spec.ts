import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableColumnTextComponent } from './dynamatable-column-text.component';

describe('DynamatableColumnTextComponent', () => {
  let component: DynamatableColumnTextComponent;
  let fixture: ComponentFixture<DynamatableColumnTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableColumnTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableColumnTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
