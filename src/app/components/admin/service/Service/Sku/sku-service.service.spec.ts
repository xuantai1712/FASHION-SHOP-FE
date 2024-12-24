import { TestBed } from '@angular/core/testing';

import { SkuService } from './sku-service.service';

describe('SkuServiceService', () => {
  let service: SkuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
