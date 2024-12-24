import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ForgotPasswordService} from '../../services/forgot-password/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  @ViewChild('resetPasswordForm') resetPasswordForm!: NgForm;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  email: string = '';

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
    this.email = this.activatedRoute.snapshot.queryParams['email'];
  }

  onResetPassword() {
    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.passwordsDoNotMatch = true;
      return;
    }

    this.passwordsDoNotMatch = false;

    // Call the backend API
    this.forgotPasswordService.resetPassword(this.email,this.newPassword).subscribe({
      next: () => {
        alert('Mật khẩu của bạn đã được đặt lại thành công!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Đã xảy ra lỗi:', error);
        alert('Đặt lại mật khẩu không thành công. Vui lòng thử lại!');
      }
    });
  }
}
