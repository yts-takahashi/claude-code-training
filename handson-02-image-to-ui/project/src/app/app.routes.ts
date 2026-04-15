import { Routes } from '@angular/router';
import { ClientDetailComponent } from './pages/clients/client-detail.component';
import { DomesticOrderComponent } from './pages/domestic-order/domestic-order.component';

export const routes: Routes = [
  { path: '', component: DomesticOrderComponent },
  { path: 'domestic-order', component: DomesticOrderComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
];
