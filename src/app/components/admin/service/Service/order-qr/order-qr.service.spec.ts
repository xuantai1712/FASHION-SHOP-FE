import { TestBed } from '@angular/core/testing';

import { OrderQrService } from './order-qr.service';

describe('OrderQrService', () => {
  let service: OrderQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
