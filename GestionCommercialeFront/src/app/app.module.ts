import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConventionFormComponent } from './pages/convention/convention-form/convention-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ClientUpdateComponent } from './pages/clients/client-update/client-update.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { AppCardsComponent } from './pages/Applications/app-cards/app-cards.component';
import { AppFormComponent } from './pages/Applications/app-form/app-form.component';
import { AppUpdateComponent } from './pages/Applications/app-update/app-update.component';
import { MenuUiComponent } from './pages/menu-ui/menu-ui.component';
import { ConventionListComponent } from './pages/convention/convention-list/convention-list.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UserUpdateComponent } from './pages/users/user-update/user-update.component';
import { ConventionUpdateComponent } from './pages/convention/convention-update/convention-update.component';

@NgModule({

  declarations: [
    ConventionUpdateComponent,
    ConventionFormComponent,
    UserListComponent,
    UserFormComponent,
    ClientUpdateComponent,
    ClientFormComponent,
    MenuComponent,
    AppComponent,
    ClientListComponent,
    AppCardsComponent,
    AppFormComponent,
    AppUpdateComponent,
    MenuUiComponent,
    ConventionListComponent,
    NavbarComponent,
    UserUpdateComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
