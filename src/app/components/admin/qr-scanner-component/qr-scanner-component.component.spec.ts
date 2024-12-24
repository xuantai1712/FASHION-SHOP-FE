import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScannerComponentComponent } from './qr-scanner-component.component';

describe('QrScannerComponentComponent', () => {
  let component: QrScannerComponentComponent;
  let fixture: ComponentFixture<QrScannerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrScannerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrScannerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
