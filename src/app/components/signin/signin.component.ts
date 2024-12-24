import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {RegisterDTO} from '../../dtos/user/register.dto';
import {catchError, debounceTime, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  email: string;
  phone: string;
  password: string;
  retypePassword: string;
  name: string;
  isActive: boolean;
  showPassword: boolean = false;

  constructor(private router: Router, private userService: UserService){
    debugger
    this.email = '';
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.name = '';
    this.isActive = true;
    //inject
  }


  register() {
    const message =
      `email: ${this.email}`+
      `phone: ${this.phone}`+
      `password: ${this.password}`+
      `retypePassword: ${this.retypePassword}`+
      `name: ${this.name}`+
      `isActive: ${this.isActive}`
    //alert(message);
    debugger

    const registerDTO:RegisterDTO = {
      "name": this.name,
      "phone": this.phone,
      "email": this.email,
      "password": this.password,
      "retype_password": this.retypePassword,
      // "facebook_account_id": null,
      // "google_account_id": null,
      "role_id": 2
    }

    this.userService.register(registerDTO).subscribe({

      next: (response: any) => {
        debugger
        const confirmation = window
          .confirm('Đăng ký thành công, mời bạn đăng nhập. Bấm "OK" để chuyển đến trang đăng nhập.');
        if (confirmation) {
          this.router.navigate(['/login']);
        }
      },
      error: (error: any) => {
        debugger
      }
    })
  }

  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword']
        .setErrors({ passwordMismatch: true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkEmailExists() {
    const emailControl = this.registerForm.form.controls['email'];
    if (emailControl && emailControl.valid) { // Chỉ gọi API khi email hợp lệ
      this.userService.checkEmail(this.email).subscribe({
        next: (exists) => {
          if (exists) {
            emailControl.setErrors({ emailTaken: true });
          } else {
            if (emailControl.errors) {
              delete emailControl.errors['emailTaken'];
              if (Object.keys(emailControl.errors).length === 0) {
                emailControl.setErrors(null);
              }
            }
          }
        },
        error: (err) => console.error('Error checking email:', err)
      });
    }
  }

  checkPhoneExists() {
    const phoneControl = this.registerForm.form.controls['phone'];
    if (phoneControl && phoneControl.valid) {
      this.userService.checkPhone(this.phone).subscribe({
        next: (exists) => {
          if (exists) {
            phoneControl.setErrors({ phoneTaken: true });
          } else {
            if (phoneControl.errors) {
              delete phoneControl.errors['phoneTaken'];
              if (Object.keys(phoneControl.errors).length === 0) {
                phoneControl.setErrors(null);
              }
            }
          }
        },
        error: (err) => console.error('Error checking phone:', err)
      });
    }
  }

}
