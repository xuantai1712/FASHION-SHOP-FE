import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrOrderComponent } from './qr-order.component';

describe('QrOrderComponent', () => {
  let component: QrOrderComponent;
  let fixture: ComponentFixture<QrOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
