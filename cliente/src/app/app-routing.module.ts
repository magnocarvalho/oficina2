import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './rotas/login/login.component';
import { PromoComponent } from './rotas/promo/promo.component';
import { NotFoundPageComponent } from './rotas/not-found-page/not-found-page.component';
import { EmpresaComponent } from './rotas/empresa/empresa.component';
import { FavoriteComponent } from './rotas/favorite/favorite.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'index', component: PromoComponent
  },
  {
    path: 'favorite', component: FavoriteComponent
  },
  {
    path: 'empresa/:id', component: EmpresaComponent
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
