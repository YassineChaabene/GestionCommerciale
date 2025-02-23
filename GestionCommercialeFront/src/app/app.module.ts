import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientFormComponent,
    MenuComponent,
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientListComponent,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
