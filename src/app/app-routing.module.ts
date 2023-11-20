import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './guards/authguard';
import { LogpartsComponent } from './pages/logparts/logparts.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'Main', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'Logparts', component: LogpartsComponent, canActivate: [AuthGuard] },

  { path: '*', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
