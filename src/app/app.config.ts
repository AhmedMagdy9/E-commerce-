import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './shared/interceptors/headers/header.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
 import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './shared/interceptors/loading/loading.interceptor';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}


// withHashLocation() ,

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter( routes ,  withViewTransitions(),   withInMemoryScrolling({scrollPositionRestoration : "enabled"})), provideClientHydration(withEventReplay()),

    provideHttpClient( withFetch() ,  withInterceptors([headerInterceptor , loadingInterceptor])),

    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom([BrowserAnimationsModule],
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      NgxSpinnerModule
    )
  ]
};
