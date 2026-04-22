import { Routes } from '@angular/router';
import { ClientDetailComponent } from './pages/clients/client-detail.component';
import { DomesticOrderComponent } from './pages/domestic-order/domestic-order.component';
import { KabuKaiInputComponent } from './pages/kabu-kai/kabu-kai-input.component';

export const routes: Routes = [
  { path: '', component: KabuKaiInputComponent },
  { path: 'kabu-kai', component: KabuKaiInputComponent },
  { path: 'domestic-order', component: DomesticOrderComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
];
