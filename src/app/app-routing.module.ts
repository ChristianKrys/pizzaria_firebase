import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {path: 'home' , component: HomeComponent},
  {path: 'login' , loadChildren : () => import('./google-login/google-login.module').then(m => m.GoogleLoginModule)},
  // {path: '' , redirectTo: 'home', pathMatch: 'full'},
  // {path: '**' , component: Oops404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
