import { TestBed } from '@angular/core/testing';

import { ScriptsStoreService } from './scripts-store.service';

describe('ScriptsStoreService', () => {
  let service: ScriptsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
