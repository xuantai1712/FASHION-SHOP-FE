import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {LoginResponse} from '../../responses/user/login.response';
import {LoginDTO} from '../../dtos/user/login.dto';
import {UserService} from '../../services/user/user.service';
import {TokenService} from '../../services/token/token.service';
import {RoleService} from '../../services/role/role.service';
import {UserResponse} from '../../responses/user/user.response';
import {Role} from '../../model/role';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;

  /*
  //Login user1
  phoneNumber: string = 'john@gmail.com';
  password: string = 'password123';

  //Login admin
  phoneNumber: string = 'admin@admin.com';
  password: string = 'admin';


*/

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = ''; // Thêm biến lưu lỗi

  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse

  onEmailChange() {
    console.log(`Email typed: ${this.email}`);
    //how to validate ? phone must be at least 6 characters
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
  ) { }

  ngOnInit() {
    // Gọi API lấy danh sách roles và lưu vào biến roles
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { // Sử dụng kiểu Role[]
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.errorMessage = params['error'] || null;
    });

  }

  createAccount() {
    debugger
    // Chuyển hướng người dùng đến trang đăng ký (hoặc trang tạo tài khoản)
    this.router.navigate(['/signin']);
  }

  login() {
    const message = `email: ${this.email}` +
      `password: ${this.password}`;
    //alert(message);
    debugger

    const loginDTO: LoginDTO = {
      email: this.email,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);
        debugger;
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
          debugger;
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                ...response,
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              if(this.userResponse?.role.name == 'admin') {
                 this.router.navigate(['/admin']);
                // this.router.navigate(['/']);
              } else if(this.userResponse?.role.name == 'user') {

                this.router.navigate(['/']);
              }

            },

            error: (error: any) => {
              this.errorMessage = error.error.message || 'Đã xảy ra lỗi'; // Hiển thị lỗi cụ thể
            }
          });
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Email hoặc mật khẩu không đúng'; // Thông báo lỗi khi đăng nhập thất bại
      }
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
