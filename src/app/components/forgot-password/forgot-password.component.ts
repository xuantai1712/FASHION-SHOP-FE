import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ForgotPasswordService} from '../../services/forgot-password/forgot-password.service';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @ViewChild('forgotPasswordForm') forgotPasswordForm!: NgForm;
  email: string = '';
  errorMessage: string = '';

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {}

  onSubmit() {
    // Gọi API để gửi OTP qua email
    console.log(this.email);
    this.forgotPasswordService.forgotPassword(this.email).subscribe({

      next: (response) => {
        console.log(response);
        // Chuyển đến bước tiếp theo (Xác thực OTP)
        this.router.navigate(['/OTP'], { queryParams: { email: this.email } });
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message || 'Có lỗi xảy ra';
      }
    });
  }
}
