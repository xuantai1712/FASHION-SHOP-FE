import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ProductPageComponent} from '../product-page/product-page.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductPageComponent,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  {





  // constructor() { }
  //
  // ngOnInit(): void {
  //   const toggleButton = document.getElementById('menu-toggle');
  //   const wrapper = document.getElementById('wrapper');
  //   toggleButton?.addEventListener('click', () => {
  //     wrapper?.classList.toggle('toggled');
  //   });
  // }
}
