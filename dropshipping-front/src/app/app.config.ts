import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { fictionRoutes } from './component/products/fiction/fiction.routes';
import { nonFictionRoutes } from './component/products/non-fiction/non-fiction.routes';
import { childrenLiteratureRoutes } from './component/products/childrens-literature/childrens-literature.routes';
import { profileRoutes } from './component/profile/profile.routes';


const appRoutes = [...routes,...fictionRoutes,...nonFictionRoutes,...childrenLiteratureRoutes];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes), provideClientHydration(), provideAnimationsAsync('noop'),provideHttpClient()]
};
