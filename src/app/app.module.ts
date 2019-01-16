import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';


import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { CurrencyRestCallsService } from './currency/currency-rest-call-service';
import { PaginationService } from './currency/pagination.service'
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'converter', component: LoginComponent },
  { path: 'logout', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HomeModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [CurrencyRestCallsService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
