import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ClientUpdateComponent } from './pages/clients/client-update/client-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/add', component: ClientFormComponent },
  { path: 'client-update/:id', component: ClientUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
