import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // required animations providers
    provideClientHydration(), // required toastr providers
    provideHttpClient( withFetch() ), // required http client request
    provideRouter(routes),
    provideToastr(),
  ]
};
