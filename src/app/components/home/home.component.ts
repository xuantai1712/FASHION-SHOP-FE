import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    // Reload trang trước khi vào trang Home
    // if (!sessionStorage.getItem('hasReloaded')) {
    //   // Đánh dấu là đã reload
    //   sessionStorage.setItem('hasReloaded', 'true');
    //   // Reload trang
    //   window.location.reload();
    // }
  }
}
