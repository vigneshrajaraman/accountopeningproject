import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorProviders } from './interceptor/interceptorList';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { MenuComponent } from './home/menu/menu.component';
import { BodyComponent } from './home/body/body.component';
import { CreateAccountComponent } from './home/body/create-account/create-account.component';
import  {MatCurrencyFormatModule} from 'mat-currency-format';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    BodyComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatCurrencyFormatModule
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
