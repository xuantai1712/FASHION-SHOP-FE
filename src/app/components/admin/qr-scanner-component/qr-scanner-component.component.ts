import { Component } from '@angular/core';
import { Result } from '@zxing/library'; // Correct import for Result
import {ZXingScannerComponent, ZXingScannerModule} from '@zxing/ngx-scanner';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-qr-scanner-component',
  standalone: true,
  imports: [
    ZXingScannerModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './qr-scanner-component.component.html',
  styleUrl: './qr-scanner-component.component.scss'
})
export class QrScannerComponentComponent {
  orderId: string;
  isQrCodeScanned: boolean;

  constructor(private router: Router) {
    this.orderId = ''; // Initialize with a default value
    this.isQrCodeScanned = false;
  }

   handleQrCodeResult(result: string) {
    this.orderId = result; // Get order ID from the scanned QR code
    this.router.navigate(['/admin/qr-order'], { queryParams: { orderId: this.orderId } });
  }

  getOrderDetails(orderId: string) {
    console.log(`Fetching order details for order ID: ${orderId}`);
    // Make your API call here
  }

}
