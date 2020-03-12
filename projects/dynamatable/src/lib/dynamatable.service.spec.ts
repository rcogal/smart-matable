import { TestBed } from '@angular/core/testing';

import { DynamatableService } from './dynamatable.service';

describe('DynamatableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamatableService = TestBed.get(DynamatableService);
    expect(service).toBeTruthy();
  });
});
