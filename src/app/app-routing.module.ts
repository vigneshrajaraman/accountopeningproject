import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './Auth/auth.service';
import { CreateAccountComponent } from './home/body/create-account/create-account.component';
import { VerfierComponent } from './home/body/verfier/verfier.component';
import { ReworkComponent } from './home/body/rework/rework.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {path:"login", component:LoginComponent},
  {path:"aoa", component:HomeComponent, canActivate:[AuthService], children:[
    {path:"create", component: CreateAccountComponent,canActivate:[AuthService]},
    {path:"verifier", component: VerfierComponent,canActivate:[AuthService]},
    {path:"rework", component: ReworkComponent,canActivate:[AuthService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
