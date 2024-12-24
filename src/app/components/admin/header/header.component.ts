import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.setDefaultLang('vi');
  }
  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
