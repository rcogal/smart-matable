import { TestBed } from '@angular/core/testing';

import { DynamatableConfigurationService } from './dynamatable-configuration.service';

describe('DynamatableConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamatableConfigurationService = TestBed.get(DynamatableConfigurationService);
    expect(service).toBeTruthy();
  });
});
