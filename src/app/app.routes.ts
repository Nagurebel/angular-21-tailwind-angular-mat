import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';
import { unsavedChangesGuardGuard } from './guards/unsaved-changes-guard-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [loginGuard],
        loadComponent: () => import('../app/auth/login/login.component').then((c) => c.LoginComponent),
    },
    {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('../app/auth/login/login.component').then((c) => c.LoginComponent),
    },
    {
        path: 'register',
        canActivate: [loginGuard],
        canDeactivate: [unsavedChangesGuardGuard],
        loadComponent: () => import('../app/auth/register/register.component').then((c) => c.RegisterComponent),
    },
    {
        path: 'layout',
        canActivate: [authGuard],
        loadComponent: () => import('../app/layout/layout/layout.component').then((c) => c.LayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('../app/dashboard/dashboard.component').then((c) => c.DashboardComponent),
            },
            {
                path: 'trip/:id',
                loadComponent: () => import('../app/dashboard/update-trip/update-trip.component').then(c => c.UpdateTripComponent)
            }
        ]
    }
];
