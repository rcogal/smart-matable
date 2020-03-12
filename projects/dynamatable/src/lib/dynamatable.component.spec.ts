import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamatableComponent } from './dynamatable.component';

describe('DynamatableComponent', () => {
  let component: DynamatableComponent;
  let fixture: ComponentFixture<DynamatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
