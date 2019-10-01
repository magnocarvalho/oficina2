import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundPageComponent } from "./auth/not-found-page/not-found-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CreateLoginComponent } from "./auth/create-login/create-login.component";
import { InfosEmpresaComponent } from './auth/infos-empresa/infos-empresa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuard } from './guard/dashboard.guard';
import { AuthGuard } from './guard/auth.guard';
import { FormGuard } from './guard/form.guard';
import { IndexComponent } from './auth/index/index.component';
import { NewPromoComponent } from './component/new-promo/new-promo.component';
import { ReportsComponent } from './component/reports/reports.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent, canActivate: [DashboardGuard]
  },
  {
    path: 'index', component: IndexComponent, canActivate: [DashboardGuard]
  },
  { path: "register", component: CreateLoginComponent, canActivate: [DashboardGuard] },
  {
    path: "adm", component: DashboardComponent, canActivate: [AuthGuard]
  },
  { path: "reports", component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'new-promo', component: NewPromoComponent, canActivate: [AuthGuard] },
  { path: "landpage", component: LandingPageComponent, canActivate: [DashboardGuard] },
  { path: "form-empresa", component: InfosEmpresaComponent, canActivate: [FormGuard] },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
