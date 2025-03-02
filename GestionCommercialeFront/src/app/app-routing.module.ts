import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ClientUpdateComponent } from './pages/clients/client-update/client-update.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './../app/pages/auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'menu', component: MenuComponent ,canActivate: [AuthGuard]},
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/add', component: ClientFormComponent },
  { path: 'client-update/:uuid', component: ClientUpdateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
