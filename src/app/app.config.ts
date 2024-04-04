import { APP_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppEffects, appReducer } from '@app-state';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideStore({ app: appReducer }),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
      }),
      EffectsModule.forRoot(AppEffects),
      HttpClientModule,
      HttpClientJsonpModule
    ),
    {
      provide: APP_ID,
      useValue: 'sky-forecast',
    },
  ],
};
