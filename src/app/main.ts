import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './layout/app.config';
import { AppComponent } from './features/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
