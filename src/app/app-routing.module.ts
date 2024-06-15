import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiDocComponent } from './api-doc/api-doc.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';  // Import ProfileComponent
import { AuthGuard } from './auth-guard.service';  // Import AuthGuard

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'api-list', component: ApiListComponent, canActivate: [AuthGuard] },
  { path: 'api-doc/:id', component: ApiDocComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  // Add profile route
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
