import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Giữ lại các providers hiện có trong appConfig
    provideHttpClient(), // Thêm HttpClient vào danh sách providers
  ],
})
  .catch((err) => console.error(err));

