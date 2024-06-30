import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { addTokenInterceptor } from './add-token-interceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers:
  [
    provideRouter(routes),
    provideHttpClient(),
    BrowserModule,
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    HammerModule,
    provideAnimations(),
  ]
};
