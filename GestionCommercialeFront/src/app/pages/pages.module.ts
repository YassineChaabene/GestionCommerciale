import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';


@NgModule({
  declarations: [
    AuthComponent,
    MenuComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
