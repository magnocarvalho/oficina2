import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundPageComponent } from "./auth/not-found-page/not-found-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CreateLoginComponent } from "./auth/create-login/create-login.component";
import { InfosEmpresaComponent } from './auth/infos-empresa/infos-empresa.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  { path: "register", component: CreateLoginComponent },
  { path: "index", component: DashboardComponent },
  { path: "landpage", component: LandingPageComponent },
  { path: "form-empresa", component: InfosEmpresaComponent },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
