import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { AppComponent } from "../app.component";
import { ClientFormComponent } from "../pages/clients/client-form/client-form.component";
import { ClientListComponent } from "../pages/clients/client-list/client-list.component";
import { MenuComponent } from "../pages/menu/menu.component";

export interface Client {
    id?: number; // Optional because it might not exist when creating a new client
    code: number;
    intitule: string;
    telephone: string;
    email: string;
    adresse: string;
  }
@NgModule({
  declarations: [
    ClientFormComponent,
    MenuComponent,
    AppComponent,
    ClientListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
  