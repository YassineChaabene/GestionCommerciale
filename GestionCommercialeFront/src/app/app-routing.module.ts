import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ClientUpdateComponent } from './pages/clients/client-update/client-update.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './../app/pages/auth/auth.guard';
import { AppCardsComponent } from './pages/Applications/app-cards/app-cards.component';
import { AppFormComponent } from './pages/Applications/app-form/app-form.component';
import { AppUpdateComponent } from './pages/Applications/app-update/app-update.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ConventionListComponent } from './pages/convention/convention-list/convention-list.component';
import { UserUpdateComponent } from './pages/users/user-update/user-update.component';

import { ConventionFormComponent } from './pages/convention/convention-form/convention-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/add', component: ClientFormComponent },
  { path: 'client-update/:uuid', component: ClientUpdateComponent },
   {path:'applications', component: AppCardsComponent},
   {path:'applications/add', component: AppFormComponent},
   {path:'application-update/:id', component: AppUpdateComponent },
   { path: 'users', component: UserListComponent },
   { path: 'conventions', component: ConventionListComponent },
   { path: 'conventions/add', component: ConventionFormComponent },
   { path: 'users/add', component: UserFormComponent },
   {path: 'user-update/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
