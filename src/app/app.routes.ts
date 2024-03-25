import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ForgottenPasswordCodeComponent } from './pages/auth/forgotten-password-code/forgotten-password-code.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'logout',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
