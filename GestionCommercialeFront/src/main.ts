import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/models/client.model';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
