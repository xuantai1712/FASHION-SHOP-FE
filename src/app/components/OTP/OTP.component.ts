import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ForgotPasswordService} from '../../services/forgot-password/forgot-password.service';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-OTP',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './OTP.component.html',
  styleUrl: './OTP.component.scss'
})
export class OTPComponent {
  @ViewChild('OtpForm') forgotPasswordForm!: NgForm;
  otp: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    // Lấy email từ query params
    this.email = this.activatedRoute.snapshot.queryParams['email'];
  }

  onSubmit() {
    this.errorMessage = ''; // Reset lỗi trước khi gọi API
    this.forgotPasswordService.verifyOtp(this.email, this.otp).subscribe({
      next: (response) => {
        console.log(response.message);
        alert(response.message); // Hiển thị thông báo thành công
        this.router.navigate(['/resetPassword'], { queryParams: { email: this.email } });
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message || 'Có lỗi xảy ra';
      }
    });
  }
}
