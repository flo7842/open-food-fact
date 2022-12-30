import { TestBed } from '@angular/core/testing';

import { CallApiService } from './call-api.service';

describe('CallApiService', () => {
  let service: CallApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
