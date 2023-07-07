//módulo raíz
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsAdministrationModule } from './modules/persons-administration/persons-administration.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminLayoutModule } from './shared/admin-layout/admin-layout.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent] //nos permite cargar nuestra app, "bootstraping"
    ,
    imports: [
        BrowserModule,
        AppRoutingModule,
        PersonsAdministrationModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        AdminLayoutModule,
        HttpClientModule
    ]
})
export class AppModule { }